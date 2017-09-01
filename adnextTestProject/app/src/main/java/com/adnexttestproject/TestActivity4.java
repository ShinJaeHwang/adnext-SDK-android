package com.adnexttestproject;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.mocoplex.adnext.AdlibAdListener;
import com.mocoplex.adnext.AdlibManager;
import com.mocoplex.adnext.common.AdlibState;

// Interstitial
public class TestActivity4 extends AppCompatActivity implements
        View.OnClickListener {

    private AdlibManager adlibManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test4);

        // 버튼 클릭 리스너
        findViewById(R.id.btnInterstitialRequest).setOnClickListener(this);

        // 애드립 매니저 생성
        adlibManager = new AdlibManager(this, AdlibTestProjectConstants.ADLIB_API_KEY);

        // 테스트 모드 셋팅
        adlibManager.setTestMode(AdlibTestProjectConstants.ADLIB_TEST_MODE);

        // 애드립 광고 리스너 생성
        adlibManager.setAdListener(new AdlibAdListener() {
            @Override
            public void onReceiveAd() {
                Log.d("ADNext", "[Interstitial] onReceiveAd ");
            }

            @Override
            public void onFailedToReceiveAd(AdlibState error) {
                Log.d("ADNext", "[Interstitial] onFailedToReceiveAd " + error.toString());
                Toast.makeText(getApplicationContext(), "광고수신 실패 :)", Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onClicked() {
                Log.d("ADNext", "[Interstitial] onClickAd");
            }

            @Override
            public void onClosed() {
                Log.d("ADNext", "[Interstitial] onClosed");
            }
        });

    }

    @Override
    protected void onResume() {
        super.onResume();
        adlibManager.onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
        adlibManager.onPause();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        adlibManager.onDestroy();
    }

    // 버튼 클릭 이벤트
    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btnInterstitialRequest :
                // 전면 광고 로딩
                adlibManager.interstitialStart();
                break;
        }

    }
}
