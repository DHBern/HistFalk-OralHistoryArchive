#!/bin/sh

/usr/sbin/crond -l 2 -f &
bundle exec jekyll serve --host 0.0.0.0
