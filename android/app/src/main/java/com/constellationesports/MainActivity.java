package com.constellationesports;

import android.os.Bundle;
import com.getcapacitor.BridgeActivity;
import com.codetrixstudio.capacitor.GoogleAuth.GoogleAuth;

import android.os.Bundle; // required for onCreate parameter

public class MainActivity extends BridgeActivity {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        registerPlugin(com.getcapacitor.community.facebooklogin.FacebookLogin.class);
        registerPlugin(GoogleAuth.class);
    }
}
