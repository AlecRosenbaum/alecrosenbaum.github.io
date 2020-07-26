---
layout: post
title:  "Passive Bus Arrival Android Notifications"
date:   2017-08-22 2:30:00 -0400
categories: android truetime port-authority rss tasker flask python
excerpt_separator: <!--more-->
---

![Lock Screen]({{ site.url }}/static/posts/truetime_rss/lock_screen_screenshot.png) ![Details]({{ site.url }}/static/posts/truetime_rss/notification_screenshot.png)

<!--more-->

As a student who lives a little far from campus and whose tuition includes free bus rides on the local public transit system (Port Authority), naturally I use them on a daily basis to get to classes. Port Authority also recently began providing an awesome service called [Truetime][truetime] that tracks where busses are in real time, and predicts when they'll arrive at certain stops.

So, instead of checking chrome on my phone every time I leave, it would be conveneint to have the arrival times passively displayed somewhere. My first thought was to use the truetime developer api to serve an rss feed that can then be displayed using any rss feed service that can be configured to update relatively frequently. So I wrote a simple rss feed that's served using [flask][flask] and [Feedgenerator][feedgen]:

{% highlight python %}
#!/usr/bin/python3.6
import requests
import json
import datetime

from flask import Flask, abort
from feedgen.feed import FeedGenerator

API_KEY = "__YOUR_API_KEY_HERE__"

BASE_URL = "http://realtime.portauthority.org/bustime/api/v3/getpredictions?key={API_KEY}&stpid={STOP_ID}&rtpidatafeed=Port%20Authority%20Bus&format=json"  # noqa
LINK_URL = "http://truetime.portauthority.org/bustime/eta/eta.jsp?route=---&direction=---&stop=---&id={STOP_ID}&showAllBusses=on&findstop=on"  # noqa
app = Flask(__name__)


def get_datetime(str):
    return datetime.datetime.strptime(str, "%Y%m%d %H:%M")


@app.route('/favicon.ico')
def favicon():
    abort(404)


@app.route("/<STOP_ID>")
def get_rss(STOP_ID):
    r = requests.get(BASE_URL.format(API_KEY=API_KEY, STOP_ID=STOP_ID))
    predictions = json.loads(r.content)

    fg = FeedGenerator()
    fg.title("Bus Time Predictions")
    fg.link(href=LINK_URL.format(STOP_ID=STOP_ID))
    fg.description("Bus time Predictions for Stop {STOP_ID}".format(STOP_ID=STOP_ID))
    for i in predictions['bustime-response']['prd']:
        BUS_NUM = "{BUS_NUM:3}".format(BUS_NUM=i['rt'])
        PRD_MIN = "{PRD_MIN:2} min".format(
            PRD_MIN=int(str(get_datetime(i['prdtm'])-get_datetime(i['tmstmp'])).split(':')[1]))

        new_prd = fg.add_entry()
        new_prd.title(" ".join([BUS_NUM, PRD_MIN]))
        new_prd.link(href=LINK_URL.format(STOP_ID=STOP_ID))
        new_prd.description("")

    return fg.rss_str()


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=80)
{% endhighlight %}

Now, after spinning up a small t2.micro instance on AWS and installing the code above to start on boot, I have an rss feed available for any given stop id (the bus stops are numbered and labeled).

What can you do with an rss feed? Well, I chose an RSS feed because it's simple, easy to parse, and is a pretty standard way of transmitting this type of basic information. In my case, I want to have bus arrivals displayed passively on my phone in the notification tray. This seems like a job for [Tasker][tasker]!

With tasker, it becomes relatively easy to a) create a task that will run every few minutes only when I'm home or near home, b) get/parse the rss, and c) create an updating notification that neatly displays the arrival times. First, I wrote a task that would produce the desired notification. This involved running a HTTP Get request, then doing a search/replace on a couple regex's to turn the feed into a csv format that can be passed to [AutoNotification][autonotification] (a tasker plugin) to diplay as a table.
The details of how I set this up, are below:

![Task]({{ site.url }}/static/posts/truetime_rss/task_screenshot.png) ![AutoNotification]({{ site.url }}/static/posts/truetime_rss/autonotification_screenshot.png)

Then, just tie the task to a profile that activates near home and every few minutes, and you're good to go!

![Profile]({{ site.url }}/static/posts/truetime_rss/profile_screenshot.png)

Final solution:

![Lock Screen]({{ site.url }}/static/posts/truetime_rss/lock_screen_screenshot.png) ![Details]({{ site.url }}/static/posts/truetime_rss/notification_screenshot.png)

[truetime]: http://truetime.portauthority.org/bustime/home.jsp
[flask]: http://flask.pocoo.org/
[feedgen]: https://github.com/lkiesow/python-feedgen
[tasker]: http://tasker.dinglisch.net/
[autonotification]: https://play.google.com/store/apps/details?id=com.joaomgcd.autonotification&hl=en
