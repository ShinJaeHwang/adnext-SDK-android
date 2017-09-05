package com.adnexttestproject.interstitial;

import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;
import android.view.View;
import android.widget.Toast;

import com.adnexttestproject.ADNextTestProjectConstants;
import com.adnexttestproject.R;
import com.mocoplex.adnext.ADNextAdListener;
import com.mocoplex.adnext.ADNextManager;
import com.mocoplex.adnext.common.ADNextState;

// Interstitial
public class ADNextInterstitialActivity extends AppCompatActivity implements
        View.OnClickListener {

    private ADNextManager adNextManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_adnextinterstitial);

        // 버튼 클릭 리스너
        findViewById(R.id.btnInterstitialRequest).setOnClickListener(this);

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
                Log.d("ADNext", "[Interstitial] onReceiveAd ");
            }

            @Override
            public void onFailedToReceiveAd(ADNextState error) {
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

    // 버튼 클릭 이벤트
    @Override
    public void onClick(View v) {
        switch (v.getId()) {
            case R.id.btnInterstitialRequest :
                // 전면 광고 로딩
                adNextManager.interstitialStart();
                break;
        }

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
