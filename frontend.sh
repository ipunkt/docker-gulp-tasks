#!/bin/bash

IMAGE="ipunktbs/gulp-tasks"
USERID=$(id -u)
GROUPID=$(id -g)
RUNCOMMAND="docker run  -it --rm --user $USERID:$GROUPID -v $(pwd):/var/project $IMAGE"
echo "$RUNCOMMAND"

function help {
	echo "$0 [COMMAND]"
	echo
	echo "Commands"
	echo "== build =="
	echo "== watch =="
	return
}

COMMAND=$1
shift

case $COMMAND in
	build)
		$RUNCOMMAND gulp
		;;
	run)
		$RUNCOMMAND $@
		;;
	watch)
		$RUNCOMMAND gulp watch
		;;
	*)
		help
		;;
esac
