# ADNext AOS SDK 적용 가이드
> ADNext AOS SDK를 사용하여 애드립 광고를 노출하는 방법을 제공합니다.<br>


## 지원 광고 플랫폼
- ADNext AD Network


## 개발환경
- 최소 SDK Version : Android 19
- Compile SDK : Android 22 이상
- Build Tool : Android Stdio 권장
<br><br>

## 프로젝트 연동

### 기본 설정

#### ADNext 라이브러리 적용
* [AAR 다운로드 링크](../AAR)
- 위 링크에서 최신버전 adnext.*.*.*.*.aar 파일을 다운 받아 프로젝트의 app/libs 폴더로 이동
- build.gradle(Module:app)에서 라이브러리 적용
```java
dependencies {
    repositories {
        flatDir {
            dirs 'libs'
        }
    }
    
 ...
 
    compile(name: 'adnext.1.0.0.0', ext: 'aar')                      // ADNext Library
}
```

<br>

### 띠 배너 연동

- ADNext 기본 띠 배너
- 참고 : [띠 배너 샘플 링크](./app/src/main/java/com/adnexttestproject/banner/README.md)

#### 단계1. 레이아웃 생성
- 배너 광고를 넣을 레이아웃 생성
```XML
 ...
   <FrameLayout
        android:id="@+id/abs"
        android:layout_width="match_parent"
        android:layout_height="50dp"
        android:layout_alignParentBottom="true">
   </FrameLayout>
 ...
```

#### 단계2. ADNextManager 생성 및 사용
- ADNextManager 생성 및 초기화 이후 배너 광고 호출
- Activity Life Cycle에 맞게 ADNextManager 호출

```java
 ...
    private ADNextManager adnextManager;                                            // 애드립 매니저
    private FrameLayout abs;                                                      // 배너 광고 레이아웃

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_adnextbanner);

        // 애드립 매니저 생성
        //  - 애드립 앱 키값을 필수로 넣어주어야 합니다
        adnextManager = new ADNextManager(this, ADNextTestProjectConstants.ADNEXT_API_KEY);

        // 테스트 모드 셋팅
        //  - 테스트 광고 노출로, 상용일 경우 꼭 제거해야 합니다
        adnextManager.setTestMode(ADNextTestProjectConstants.ADNEXT_TEST_MODE);

        // 애드립 광고 리스너 등록
        adnextManager.setAdListener(new ADNextAdListener() {
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
        adnextManager.bannerViewLoad(abs);
    }

    @Override
    protected void onResume() {
        super.onResume();
        adnextManager.onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
        adnextManager.onPause();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        adnextManager.onDestroy();
    }
 ...
```

<br>

### 전면 배너 연동

- ADNext 기본 전면 배너
- 참고 : [전면 배너 샘플 링크](./app/src/main/java/com/adnexttestproject/interstitial/README.md)

#### ADNextManager 생성 및 사용
- ADNextManager 생성 및 초기화 이후 전면 광고 호출
- Activity Life Cycle에 맞게 ADNextManager 호출

```java
 ...
    private ADNextManager adnextManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_adnextinterstitial);

        // 버튼 클릭 리스너
        findViewById(R.id.btnInterstitialRequest).setOnClickListener(this);

        // 애드립 매니저 생성
        //  - 애드립 앱 키값을 필수로 넣어주어야 합니다
        adnextManager = new ADNextManager(this, ADNextTestProjectConstants.ADNEXT_API_KEY);

        // 테스트 모드 셋팅
        //  - 테스트 광고 노출로, 상용일 경우 꼭 제거해야 합니다
        adnextManager.setTestMode(ADNextTestProjectConstants.ADNEXT_TEST_MODE);

        // 애드립 광고 리스너 등록
        adnextManager.setAdListener(new ADNextAdListener() {
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
                adnextManager.interstitialStart();
                break;
        }

    }

    @Override
    protected void onResume() {
        super.onResume();
        adnextManager.onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
        adnextManager.onPause();
    }

    @Override
    protected void onDestroy() {
        super.onDestroy();
        adnextManager.onDestroy();
    }
 ...
```
