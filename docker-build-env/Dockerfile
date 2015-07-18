# Forked from https://registry.hub.docker.com/u/seadowg/android/dockerfile/

FROM java:openjdk-7-jdk

# Install SDK requirements
RUN apt-get update && \
    apt-get -y install lib32stdc++6 lib32z1 && \
    rm -rf /var/lib/apt/lists/*

# Install Android
ENV ANDROID_SDK_VERSION=24.3.3
RUN wget http://dl.google.com/android/android-sdk_r$ANDROID_SDK_VERSION-linux.tgz && \
    tar -xzvf android-sdk_r$ANDROID_SDK_VERSION-linux.tgz && \
    rm android-sdk_r$ANDROID_SDK_VERSION-linux.tgz && \
    mv android-sdk-linux /usr/local/android-sdk

# Install Android Tools
ENV ANDROID_BUILD_TOOLS_VERSION=22.0.1
RUN echo y | /usr/local/android-sdk/tools/android update sdk --filter platform-tools --no-ui --force -a && \
    echo y | /usr/local/android-sdk/tools/android update sdk --filter build-tools-$ANDROID_BUILD_TOOLS_VERSION --no-ui --force -a

# Install Android APIs
ENV ANDROID_API_VERSION=22
RUN echo y | /usr/local/android-sdk/tools/android update sdk --filter android-$ANDROID_API_VERSION --no-ui --force -a && \
    echo y | /usr/local/android-sdk/tools/android update sdk --filter extra-android-support --no-ui --force -a && \
    echo y | /usr/local/android-sdk/tools/android update sdk --filter extra-android-m2repository --no-ui --force -a

# Setup ANDROID_HOME
ENV ANDROID_HOME /usr/local/android-sdk

# Fix permissions in Android Tools
RUN chmod +x $ANDROID_HOME/tools/*

# Install NodeJS
ENV NODEJS_VERSION=0.12.7
ENV NODEJS_PACKAGE_NAME=node-v$NODEJS_VERSION-linux-x64
RUN wget https://nodejs.org/dist/v$NODEJS_VERSION/$NODEJS_PACKAGE_NAME.tar.gz && \
    tar -xzvf $NODEJS_PACKAGE_NAME.tar.gz && \
    rm $NODEJS_PACKAGE_NAME.tar.gz && \
    mv $NODEJS_PACKAGE_NAME /usr/local/nodejs

# Set PATH with NodeJS
ENV PATH=/usr/local/nodejs/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin

# Install Cordova nad Ionic
RUN npm install -g cordova ionic
