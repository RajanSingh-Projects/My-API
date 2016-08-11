FROM ubuntu:16.04
MAINTAINER Rajan Kumar Singh Email - rajansingh.uiet@gmail.com
RUN mkdir /testing
WORKDIR /testing
ADD Model/ /testing/ 
RUN apt-get -yqq update && apt-get install -yqq $(cat package.txt) && pip install -r requirements.txt
RUN wget -i files.txt
CMD ["bash", "script.sh"]
