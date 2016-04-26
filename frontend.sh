#!/bin/bash

IMAGE="ipunktbs/gulp-tasks"
RUNCOMMAND="docker run  -it --rm -v $(pwd):/var/project $IMAGE"

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
