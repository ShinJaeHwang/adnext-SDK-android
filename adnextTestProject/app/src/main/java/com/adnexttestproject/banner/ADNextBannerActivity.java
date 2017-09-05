package com.adnexttestproject.banner;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.widget.FrameLayout;

import com.adnexttestproject.ADNextTestProjectConstants;
import com.adnexttestproject.R;
import com.mocoplex.adnext.ADNextAdListener;
import com.mocoplex.adnext.ADNextManager;
import com.mocoplex.adnext.common.ADNextState;

// Banner
public class ADNextBannerActivity extends AppCompatActivity {

    private ADNextManager adNextManager;                                            // 애드립 매니저
    private FrameLayout abs;                                                      // 배너 광고 레이아웃

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_adnextbanner);

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
                Log.d("ADNext", "[Banner] onReceiveAd ");
            }

            @Override
            public void onFailedToReceiveAd(ADNextState error) {
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

        // 배너 광고 레이아웃
        abs = (FrameLayout) findViewById(R.id.abs);

        // 배너 광고 로딩
        adNextManager.bannerViewLoad(abs);
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
}
