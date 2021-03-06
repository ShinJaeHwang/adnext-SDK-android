package com.adnexttestproject.banner;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;

import com.adnexttestproject.ADNextTestProjectConstants;
import com.adnexttestproject.R;
import com.mocoplex.adnext.ADNextAdListener;
import com.mocoplex.adnext.ADNextManager;
import com.mocoplex.adnext.common.ADNextState;

// Banner (Custom Size)
public class ADNextBannerCustomActivity extends AppCompatActivity implements
        View.OnClickListener {

    private ADNextManager adNextManager;                                            // 애드립 매니저
    private ViewGroup vg;                                                         // 루트 뷰
    private LinearLayout adView;                                                  // 광고 레이아웃

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_adnextbannercustom);

        // 버튼 클릭 리스너
        findViewById(R.id.btn1).setOnClickListener(this);
        findViewById(R.id.btn2).setOnClickListener(this);

        // 매니저 생성
        //  - 앱 키값을 필수로 넣어주어야 합니다
        adNextManager = new ADNextManager(this, ADNextTestProjectConstants.ADNEXT_API_KEY);

        // 테스트 모드 셋팅
        //  - 테스트 광고 노출로, 상용일 경우 꼭 제거해야 합니다
        adNextManager.setTestMode(ADNextTestProjectConstants.ADNEXt_TEST_MODE);

        // 광고 리스너 등록
        adNextManager.setAdListener(new ADNextAdListener() {
            @Override
            public void onReceiveAd() {
                Log.d("ADNext", "[Banner_Custom] onReceiveAd ");
            }

            @Override
            public void onFailedToReceiveAd(ADNextState error) {
                Log.d("ADNext", "[Banner_Custom] onFailedToReceiveAd " + error.toString());
            }

            @Override
            public void onClicked() {
                Log.d("ADNext", "[Banner_Custom] onClickAd");
            }

            @Override
            public void onClosed() {
                Log.d("ADNext", "[Banner_Custom] onClosed");
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
        adNextManager.onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
        adNextManager.onPause();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        adNextManager.onDestroy();
    }

    // 뷰가 노출 되어야하는 시점에 호출
    private void AddCustomView() {
        if (adView != null) {
            // ADNext 띠배너 사이즈
            // 320 * 50 - 기본
            // 320 * 100
            adNextManager.bannerViewLoad(adView, 320, 100);                        // 광고 호출 - 커스텀

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
                adNextManager.destoryBannerView();
                break;
        }
    }
}
