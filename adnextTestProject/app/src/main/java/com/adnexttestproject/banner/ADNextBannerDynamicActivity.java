package com.adnexttestproject.banner;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.LinearLayout;
import android.widget.Toast;

import com.adnexttestproject.AdlibTestProjectConstants;
import com.adnexttestproject.R;
import com.mocoplex.adnext.AdlibAdListener;
import com.mocoplex.adnext.AdlibManager;
import com.mocoplex.adnext.common.AdlibState;

// Banner (Dynamic)
public class ADNextBannerDynamicActivity extends AppCompatActivity implements
        View.OnClickListener {

    private AdlibManager adlibManager;                                            // 애드립 매니저
    private ViewGroup vg;                                                         // 루트 뷰
    private LinearLayout adView;                                                  // 광고 레이아웃

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_adnextbannerdynamic);

        // 버튼 클릭 리스너
        findViewById(R.id.btn1).setOnClickListener(this);
        findViewById(R.id.btn2).setOnClickListener(this);

        // 애드립 매니저 생성
        //  - 애드립 앱 키값을 필수로 넣어주어야 합니다
        adlibManager = new AdlibManager(this, AdlibTestProjectConstants.ADLIB_API_KEY);

        // 테스트 모드 셋팅
        //  - 테스트 광고 노출로, 상용일 경우 꼭 제거해야 합니다
        adlibManager.setTestMode(AdlibTestProjectConstants.ADLIB_TEST_MODE);

        // 애드립 광고 리스너 등록
        adlibManager.setAdListener(new AdlibAdListener() {
            @Override
            public void onReceiveAd() {
                Log.d("ADNext", "[Banner_Dynamic] onReceiveAd ");
            }

            @Override
            public void onFailedToReceiveAd(AdlibState error) {
                Log.d("ADNext", "[Banner_Dynamic] onFailedToReceiveAd " + error.toString());
                Toast.makeText(getApplicationContext(), error.toString(), Toast.LENGTH_SHORT).show();
            }

            @Override
            public void onClicked() {
                Log.d("ADNext", "[Banner_Dynamic] onClickAd");
            }

            @Override
            public void onClosed() {
                Log.d("ADNext", "[Banner_Dynamic] onClosed");
            }
        });

        // 루트 뷰 생성
        vg = (ViewGroup) findViewById(R.id.container);

        // 광고 삽입용 레이아웃 동적 생성
        adView = new LinearLayout(this);
        adView.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, 100));
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
    private void AddDynamicView() {
        if (adView != null) {
            adlibManager.bannerViewLoad(adView);                                  // 광고 호출 - 일반
        }
    }

    // 버튼 클릭 리스너
    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btn1 :                                                      // Add Dynamic Banner
                // 하나의 액티비티에 하나의 다이나믹 배너만 만들 수 있습니다.
                // 이미 기존의 다이나믹 배너가 존재하는 경우 새로운 다이나믹 배너는 로드 되지 않습니다
                // 기존 다이나믹 배너를 삭제해야만 다른 다이나믹 배너가 로드 가능합니다.
                AddDynamicView();
                break;

            case R.id.btn2 :                                                      // Remove Adview
                adlibManager.destoryBannerView();
                //vg.removeView(adView);
                break;
        }
    }
}
