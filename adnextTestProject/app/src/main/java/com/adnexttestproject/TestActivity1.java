package com.adnexttestproject;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.widget.FrameLayout;

import com.mocoplex.adnext.AdlibAdListener;
import com.mocoplex.adnext.AdlibManager;
import com.mocoplex.adnext.common.AdlibState;

// Banner
public class TestActivity1 extends AppCompatActivity {

    private AdlibManager adlibManager;                                            // 애드립 매니저
    private FrameLayout abs;                                                 // 배너 레이아웃

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test1);

        // 프레임 레이아웃 생성
        abs = (FrameLayout) findViewById(R.id.abs);

        // 애드립 매니저 생성
        adlibManager = new AdlibManager(this, AdlibTestProjectConstants.ADLIB_API_KEY);

        // 테스트 모드 셋팅
        adlibManager.setTestMode(AdlibTestProjectConstants.ADLIB_TEST_MODE);

        // 애드립 광고 리스너 생성
        adlibManager.setAdListener(new AdlibAdListener() {
            @Override
            public void onReceiveAd() {
                Log.d("ADNext", "[Banner] onReceiveAd ");
            }

            @Override
            public void onFailedToReceiveAd(AdlibState error) {
                Log.d("ADNext", "[Banner] onFailedToReceiveAd " + error.toString());
            }

            @Override
            public void onClicked() {
                Log.d("ADNext", "[Banner] onClickAd");
            }

            @Override
            public void onClosed() {
                Log.d("ADNext", "[Banner] onClosed");
            }
        });
        // 광고 로딩
        adlibManager.bannerViewLoad(abs);
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
}
