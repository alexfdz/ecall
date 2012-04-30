package com.coders.ecall;


import org.apache.cordova.DroidGap;

import android.os.Bundle;

public class EmergencyCallActivity extends DroidGap {
    /** Called when the activity is first created. */
    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        this.setStringProperty("loadingDialog", "eCall,Loading application...");
        this.setIntegerProperty("loadUrlTimeoutValue", 60000);
        super.loadUrl("file:///android_asset/www/index.html");
    }
}
