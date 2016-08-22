/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicitly call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    app.receivedEvent('deviceready');
  },
  // Update DOM on a Received Event
  receivedEvent: function(id) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    listeningElement.setAttribute('style', 'display:none;');
    receivedElement.setAttribute('style', 'display:block;');

    console.log('Received Event: ' + id);
  }
};

var n = 2,
  c = 0,
  playerTimes = [],
  playerNames = [],
  pageOne = $("#divPage1"),
  pageTwo = $("#divPage2"),
  pageThree = $("#divPage3"),
  spnTimer = $("#spnTimer"),
  offset, interval;

$("#ddlPlayers").change(function() {
  $("#divNamesList").empty();
  n = $("#ddlPlayers").val();
  for (i = 0; i < n; i++) {
    $("#divNamesList").append("<input type=text id=\"txtName" + i + "\" value=\"Player" + (i + 1) + "\" class=\"textbox\" onfocus=\"watermark('txtName" + i + "','Player" + (i + 1) + "');\" onblur=\"watermark('txtName" + i + "','Player" + (i + 1) + "');\"><br>")
  }
});

/* Next button */
$("#btnNext").click(function() {
  c = 0;
  for (i = 0; i < n; i++) {
    playerNames[i] = $("#txtName" + i).val();
    $("#pName" + i).text(playerNames[i]);
    playerTimes[i] = 0;
    $("#divTimer" + i).show();
  }
  $("#divPlayButton").show();
  $("#divEndTurnButton").hide();
  $("#btnBack").show();
  $("#btnPause").hide();
  $("#btnEndGame").hide();
  pageOne.hide();
  pageTwo.show();
  pageThree.hide();
});

/* Start button */
$("#divPlayButton").click(function() {
  $("#divPlayButton").hide();
  $("#divEndTurnButton").show();
  $("#btnBack").hide();
  $("#btnPause").show();
  $("#btnEndGame").show();
  $("#lblCurrentPlayer").text(playerNames[c]);
  start($("#lblCurrentTimer")[0], c);
});

/* Pause button */
$("#btnPause").click(function() {
  stop();
  $("#divPauseOverlay").show();
});

/* Resume Button*/
$("#divPauseOverlay").click(function() {
	start($("#lblCurrentTimer")[0], c);
	$("#divPauseOverlay").hide();
});

/* End Turn Button */
$("#divEndTurnButton").click(function() {
  stop();
  if (c == n - 1) {
    c = 0;
  } else {
    c++;
  }
  $("#lblCurrentPlayer").text(playerNames[c]);
  start($("#lblCurrentTimer")[0], c);

});

/* Clear button */
$("#btnClear").click(function() {
  reset();
});

/* End Game button */
$("#btnEndGame").click(function() {
  stop();
  for (i = 0; i < n; i++) {
	  $("#Timer" + i).text(playerTimes[i]/1000)
  }
  pageOne.hide();
  pageTwo.hide();
  pageThree.show();
});

/* Back Button */
$("#btnBack").click(function() {
  pageOne.show();
  pageTwo.hide();
  pageThree.hide();
});

$("#btnNewGame").click(function() {	
  pageOne.show();
  pageTwo.hide();
  pageThree.hide();
});


function start(timer, p) {
  if (!interval) {
    offset = Date.now();
    interval = setInterval(function() {
      update(timer, p)
    }, 1);
  }
}

function stop() {
  if (interval) {
    clearInterval(interval);
    interval = null;
  }
}

function reset() {
  $("#spnTimer span").text("0.000");
  //render(0);
}

function update(timer, p) {
  playerTimes[p] += delta();
  render(timer, p);
}

function render(timer, p) {
  timer.innerHTML = playerTimes[p] / 1000;
}

function delta() {
  var now = Date.now(),
    d = now - offset;

  offset = now;
  return d;
}
