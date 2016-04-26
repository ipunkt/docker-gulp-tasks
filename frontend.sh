#!/bin/bash

IMAGE="ipunktbs/gulp-tasks"
USERID=$(id -u)
GROUPID=$(id -g)
RUNCOMMAND="docker run  -it --rm --user $USERID:$GROUPID -v $(pwd):/home/gulp/project $IMAGE"

function help {

	echo "==== frontend build helper ===="

	case $COMMAND in
		run)
			echo "$0 run command"
			echo ""
			echo "Startet command im Projektverzeichnis innerhalb des Containers"
			exit
			;;
	esac


	echo "$0 [COMMAND]"
	echo ""
	echo "Commands"
	echo "== run =="
	echo "Startet den angefügten Befehl im Projektverzeichnis"
	echo ""
	echo ""
	echo "== build =="
	echo "Startet  gulp im Projektverzeichnis im Container"
	echo
	echo "== watch =="
	echo "Startet gulp watch im Projektverzeichnis im Container"
	echo
	return
}

COMMAND=$1
shift

case $COMMAND in
	build)
		$RUNCOMMAND gulp
		;;
	run)
		if [ "$#" -lt 1 ] ; then
			help $COMMAND
			exit 1
		fi
		$RUNCOMMAND $@
		;;
	watch)
		$RUNCOMMAND gulp watch
		;;
	*)
		help
		;;
esac
