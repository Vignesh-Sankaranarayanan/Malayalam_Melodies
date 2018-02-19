'use strict';

var Alexa = require('alexa-sdk');
var mySongs=[];
mySongs.push("https://s3.amazonaws.com/vigneshsongsamazon/Super+Machi+Full+Song++Soamazon.mp3");
mySongs.push("https://s3.amazonaws.com/vigneshsongsamazon/karimizhi_kuruviye_MEESHAMADHAVAN_Amazon.mp3");
mySongs.push("https://s3.amazonaws.com/vigneshsongsamazon/Azhalinte_Azhangalil_Ayalum_Njanum_Thammil_Official_Song_Amazon.mp3");
mySongs.push("https://s3.amazonaws.com/vigneshsongsamazon/allimalarkavil_pooram_kanan_amzon.mp3");
mySongs.push("https://s3.amazonaws.com/vigneshsongsamazon/VARUVANILLARUMEE_-_MANICHITRATHAZHU_-MALAYALAM_CLASSICAL_MOVIE_SONGS-SATHARALKARAN_Amazon.mp3");
mySongs.push("https://s3.amazonaws.com/vigneshsongsamazon/Ambalapuzhe_unnikannanodu_Nee_amazon.mp3");
mySongs.push("https://s3.amazonaws.com/vigneshsongsamazon/Malayalam_Evergreen_songs_Thamara_Kannan_Urangenam_-_Vathsalyam_amazon.mp3");
mySongs.push("https://s3.amazonaws.com/vigneshsongsamazon/Malayalam_Film_Songs_unni_vavavo_ponnunni_vavavo_Malayalam_Movie_Song_Amazon.mp3");
mySongs.push("https://s3.amazonaws.com/vigneshsongsamazon/Thumbippene_Dhruvam_HQ_Amazon.mp3");
var item = mySongs[Math.floor(Math.random() * mySongs.length)];
var playList=[];

var i=Math.floor(Math.random()*mySongs.length);
var current;
var previous;
var streamInfo = {
  title: 'Malayalam Melodies',
  subtitle: 'Play a set of malayalam Melodies',
  cardContent: "",
  url: item,
  image: {
    largeImageUrl: 'https://s3.amazonaws.com/cdn.dabblelab.com/img/alexa-card-lg.png',
    smallImageUrl: 'https://s3.amazonaws.com/cdn.dabblelab.com/img/alexa-card-sm.png'
  }
};

exports.handler = (event, context, callback) => {
  var alexa = Alexa.handler(event, context, callback);

  alexa.registerHandlers(
    handlers,
    audioEventHandlers
  );

  alexa.execute();
};

var handlers = {
  'LaunchRequest': function() {
    this.emit('PlayStream');
  },
  'PlayStream': function() {
    item = mySongs[Math.floor(Math.random() * mySongs.length)];
    do{
      item = mySongs[Math.floor(Math.random() * mySongs.length)];
      if(playList.length >= mySongs.length){
        playList=[];
      }
      if ( playList.indexOf(item) > -1 ){
        current =item;
      }
    }while(item == current)
    previous=current;
    current =item;
    this.response.speak('').audioPlayerPlay('REPLACE_ALL', item, item, null, 0);
    playList.push(item);
    this.emit(':responseReady');
  },
  'NextStream': function() {
    item = mySongs[Math.floor(Math.random() * mySongs.length)];
    do{
      item = mySongs[Math.floor(Math.random() * mySongs.length)];
      if(playList.length >= mySongs.length){
        playList=[];
      }
      if ( playList.indexOf( item ) > -1 ){
        current =item;
      }
    }while(item == current)
    previous=current;
    current =item;
    this.response.speak('Playing next Song.').audioPlayerPlay('REPLACE_ALL', item, item, null, 0);
    playList.push(item);
    this.emit(':responseReady');
  },

  'ResumeStream': function(){
    //this.attributes['offsetInMilliseconds'] = getOffsetInMilliseconds.call(this);
    //var offSet=this.attributes['offsetInMilliseconds'];
    item=current;
    this.response.speak('Resuming the play').audioPlayerPlay('REPLACE_ALL', item, item, null, 0);
    this.emit(':responseReady');
  },

  'AMAZON.HelpIntent': function() {
    // skill help logic goes here
    this.response.speak('Say Open Malayalam Melodies to play the songs, if you want to play next song, then say NEXT.To pause the song say PAUSE. To resume the song say RESUME. To stop the play say STOP');
    this.emit(':responseReady');
  },
  'SessionEndedRequest': function() {
    // no session ended logic needed
  },
  'ExceptionEncountered': function() {
    console.log("\n---------- ERROR ----------");
    console.log("\n" + JSON.stringify(this.event.request, null, 2));
    this.callback(null, null)
  },
  'Unhandled': function() {
    this.response.speak('Sorry. Something went wrong.');
    this.emit(':responseReady');
  },
  'AMAZON.NextIntent': function() {
    /*current=item;
    previous=current;
    item = mySongs[Math.floor(Math.random()*mySongs.length)];
    streamInfo.url=item;
    current=item;
    streamInfo.url="https://s3.amazonaws.com/vigneshsongsamazon/Kala+Chashma+(320+Kbps)+-+Amar+Arshi+-+Badshah+-+N.mp3";
    this.response.speak('Playing next song').audioPlayerPlay('REPLACE_ALL', streamInfo.url, streamInfo.url, null, 0);
   */ 
    this.emit('NextStream');
  },
  'AMAZON.PreviousIntent': function() {
    this.response.speak('Playing previous Song');
    item=previous;
    current=previous;
    this.response.speak('Playing the previous song').audioPlayerPlay('REPLACE_ALL', item, item, null, 0);
    
  },
  
  'AMAZON.RepeatIntent': function() {
    this.response.speak('Playing  Song again');
    streamInfo.url=current;
    previous=current;
    this.response.speak('Resuming the play').audioPlayerPlay('REPLACE_ALL', item, item, null, 0);
   
  },
  'AMAZON.PauseIntent': function() {
    this.emit('AMAZON.StopIntent');
  },
  'AMAZON.CancelIntent': function() {
    this.emit('AMAZON.StopIntent');
  },
  'AMAZON.StopIntent': function() {
    this.response.speak('Okay. I\'ve stopped the stream.').audioPlayerStop();
    this.emit(':responseReady');
  },
  'AMAZON.ResumeIntent': function() {
    this.emit('ResumeStream');
  },
  'AMAZON.LoopOnIntent': function() {
    this.response.speak('Sorry this feature is currently not supported');
  },
  'AMAZON.LoopOffIntent': function() {
    this.response.speak('Sorry this feature is currently not supported');
  },
  'AMAZON.ShuffleOnIntent': function() {
    this.response.speak('Sorry this feature is currently not supported');
  },
  'AMAZON.ShuffleOffIntent': function() {
    this.response.speak('Sorry this feature is currently not supported');
  },
  'AMAZON.StartOverIntent': function() {
    playList=[];
    item = mySongs[Math.floor(Math.random() * mySongs.length)];
    do{
      item = mySongs[Math.floor(Math.random() * mySongs.length)];
      if(playList.length >= mySongs.length){
        playList=[];
      }
      if ( playList.indexOf(item) > -1 ){
        current =item;
      }
    }while(item == current)
    previous=current;
    current =item;
    this.response.speak('Starting over the play').audioPlayerPlay('REPLACE_ALL', item, item, null, 0);
    playList.push(item);
    this.emit(':responseReady');
    
   
  },
  'PlayCommandIssued': function() {

    if (this.event.request.type === 'IntentRequest' || this.event.request.type === 'LaunchRequest') {
      var cardTitle = streamInfo.subtitle;
      var cardContent = streamInfo.cardContent;
      var cardImage = streamInfo.image;
      this.response.cardRenderer(cardTitle, cardContent, cardImage);
    }

    this.response.speak('Enjoy.').audioPlayerPlay('REPLACE_ALL', item, item, null, 0);
    this.emit(':responseReady');
  },
  'PauseCommandIssued': function() {
    this.emit('AMAZON.StopIntent');
  }
}

var audioEventHandlers = {
  'PlaybackStarted': function() {
    this.emit(':responseReady');
  },
  'PlaybackFinished': function() {
    this.emit(':responseReady');
  },
  'PlaybackStopped': function() {
    this.emit(':responseReady');
  },
  'PlaybackNearlyFinished': function() {
    do{
      item = mySongs[Math.floor(Math.random() * mySongs.length)];
      if(playList.length >= mySongs.length){
        playList=[];
      }
      if ( playList.indexOf( item ) > -1 ){
        current =item;
      }
    }while(item == current)
    previous=current;
    current =item;
    this.response.audioPlayerPlay('REPLACE_ALL', item, item, null, 0);
    this.emit(':responseReady');
    
  },
  'PlaybackFailed': function() {
    this.response.audioPlayerClearQueue('CLEAR_ENQUEUED');
    this.emit(':responseReady');
  }
}