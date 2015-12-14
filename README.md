BlackBox-ionic
==============

This is a logic game of figuring out a hidden rules of number transformations.

It is written in JS and packaged with Cordova/Ionic, so it can run on most mobile platforms.


Initialization
--------------

1. Install JDK 8

2. Install Android SDK

3. Add JDK and Android SDK to system variables

4. Install Nodejs (not from linux default repos)

5. Run
```bash
$ npm install ionic cordova -g
```
6. Run in project directory
```bash
$ ./init.sh
```

Note: for Windows it's recommended to use git bash.


Running
-------

Android:
```bash
$ ionic run android
```

IOS:
```bash
$ ionic run ios
```
To create Xcode project run
```bash
$ ionic build ios
```
project will appear in platforms/ios

Desktop:
```bash
$ ionic serve
```


Build with Docker
-----------------

Prepare Docker environment with Android SDK and NodeJS:

```bash
$ docker build -t blackbox-ionic-build-env ./docker-build-env/
```

Prepare cache to reuse some stuff on rebuild.

```bash
# Prepare cache folder
$ mkdir -p /tmp/BlackBox-ionic-tmp

# Cache cordova plugins
$ grep 'cordova_plugin_add_git ' init.sh | \
    sed -r 's/[^ ]+ (.*)/\1/' | \
    xargs -n1 -I '{}' \
        sh -c 'git clone --depth=1 "{}" /tmp/BlackBox-ionic-tmp/$(basename "{}")' \
    || true
```

Build BlackBox-ionic:

```bash
$ docker run \
    -it --rm \
    --volume "$(pwd):/mnt/BlackBox-ionic" \
    --volume "/tmp/BlackBox-ionic-tmp:/tmp" \
    --workdir "/mnt/BlackBox-ionic" \
    --user "$(id -u)" \
    --env "HOME=/tmp" \
    --env "GRADLE_USER_HOME=/tmp/gradle" \
    blackbox-ionic-build-env \
    sh -c "bash init.sh && ionic build android"
```


APK
---

APK files should appear in `./platforms/android/build/outputs/apk/` folder.