# ADNext 전면 배너 적용 가이드
> ADNext 전면 배너 적용 방법에 대해 설명 드립니다. <br>

## 전면 배너 연동

### 기본 전면 
- ADNext 기본 전면 배너
- 참고 : [전면 배너 샘플 링크](./app/src/main/java/com/adnexttestproject/interstitial/README.md)

#### AdlibManager 생성 및 사용
- AdlibManager 생성 및 초기화 이후 전면 광고 호출
- Activity Life Cycle에 맞게 AdlibManager 호출

```java
 ...
    private AdlibManager adlibManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_adnextinterstitial);

        // 버튼 클릭 리스너
        findViewById(R.id.btnInterstitialRequest).setOnClickListener(this);

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
 ...
```
