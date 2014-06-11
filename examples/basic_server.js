"use strict";

var JabberServer = require( "../index" )

JabberServer.Server.prototype.getUserList = function() {
    var list = [];

    var echo_friend = new JabberServer.User( "echo@localhost", "Echo 1" );

    echo_friend.onRecieveMessage = function( client, message ) {
        echo_friend.sendMessage( client, message.attrs.from, message.getChild("body").getText() );
    }

    var friend2 = new JabberServer.User( "friend2@localhost", "Friend 2" );

    var localhost = new JabberServer.User( "test@localhost", "Test Localhost" );
    localhost.addBuddy( echo_friend );
    localhost.addBuddy( friend2 );

    list.push( localhost );
    list.push( echo_friend );
    list.push( friend2 );
    return list;
}

var server = new JabberServer.Server( { domain: "localhost", port: 5223, tls: false } );
