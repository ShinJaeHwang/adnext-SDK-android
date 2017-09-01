package com.adnexttestproject.banner;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import com.adnexttestproject.AdlibTestProjectConstants;
import com.adnexttestproject.R;
import com.mocoplex.adnext.AdlibAdListener;
import com.mocoplex.adnext.AdlibManager;
import com.mocoplex.adnext.common.AdlibState;

// Banner (Dynamic Size)
public class ADNextBannerDynamicSizeActivity extends AppCompatActivity implements
        View.OnClickListener {

    private AdlibManager adlibManager;                                            // 애드립 매니저
    private ViewGroup vg;                                                         // 루트 뷰
    private LinearLayout adView;                                                  // 광고 레이아웃

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_adnextbannerdynamicsize);

        // 버튼 클릭 리스너
        findViewById(R.id.btn1).setOnClickListener(this);
        findViewById(R.id.btn2).setOnClickListener(this);

        // 애드립 매니저 생성
        adlibManager = new AdlibManager(this, AdlibTestProjectConstants.ADLIB_API_KEY);

        // 테스트 모드 셋팅
        adlibManager.setTestMode(AdlibTestProjectConstants.ADLIB_TEST_MODE);

        // 애드립 광고 리스너 생성
        adlibManager.setAdListener(new AdlibAdListener() {
            @Override
            public void onReceiveAd() {
                Log.d("ADNext", "[Banner_Dynamic_Size] onReceiveAd ");
            }

            @Override
            public void onFailedToReceiveAd(AdlibState error) {
                Log.d("ADNext", "[Banner_Dynamic_Size] onFailedToReceiveAd " + error.toString());
            }

            @Override
            public void onClicked() {
                Log.d("ADNext", "[Banner_Dynamic_Size] onClickAd");
            }

            @Override
            public void onClosed() {
                Log.d("ADNext", "[Banner_Dynamic_Size] onClosed");
            }
        });

        // 루트 뷰 생성
        vg = (ViewGroup) findViewById(R.id.container);

        // 광고 삽입용 레이아웃 동적 생성
        adView = new LinearLayout(this);
        adView.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, 200));
        vg.addView(adView);
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

    // 뷰가 노출 되어야하는 시점에 호출
    private void AddCustomView() {
        if (adView != null) {
            // 애드립 띠배너 사이즈
            // 320 * 50 - 기본
            // 320 * 100
            adlibManager.bannerViewLoad(adView, 320, 100);             // 광고 호출 - 커스텀

        }
    }

    // 버튼 클릭 리스너
    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btn1 :                                                      // Add Custom Banner
                AddCustomView();
                break;

            case R.id.btn2 :                                                      // Remove Adview
                adlibManager.destoryBannerView();
                break;
        }
    }
}
