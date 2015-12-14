#!/bin/bash

# bash flags: (-e) Stop executing on first error and (-x) show executed commands
set -e -x

ionic platforms add android

cordova plugin add cordova-plugin-splashscreen
cordova plugin add com.ionic.keyboard
cordova plugin add cordova-plugin-whitelist
cordova plugin add org.apache.cordova.file

# This workaround is for Docker environment
function cordova_plugin_add_git() {
    repo_url="$1"
    cached_plugin_path="/tmp/$(basename "$repo_url")"
    if [ ! -e "$cached_plugin_path" ]
    then
        git clone --depth=1 "$repo_url" "$cached_plugin_path"
    fi
    cordova plugin add "$cached_plugin_path"
}

cordova_plugin_add_git "https://github.com/cogitor/PhoneGap-OrientationLock.git"
cordova_plugin_add_git "https://git-wip-us.apache.org/repos/asf/cordova-plugin-globalization.git"
cordova_plugin_add_git "https://github.com/supermina999/cordova-focus.git"
