# ADNext AOS SDK 적용 가이드
> ADNext AOS SDK를 사용하여 애드립 광고를 노출하는 방법을 제공합니다.<br>


## 지원 광고 플랫폼
- ADLIB AD Network


## 개발환경
- 최소 SDK Version : Android 19
- Compile SDK : Android 22 이상
- Build Tool : Android Stdio 권장
<br><br>

## 프로젝트 연동

### 기본 설정

#### ADNext 라이브러리 적용
* [AAR 다운로드 링크](../AAR)
- 위 링크에서 adnext.*.*.*.*.aar 파일을 다운 받아 프로젝트의 app/libs 폴더로 이동
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

#### 단계1. 레이아웃 생성
- 배너 광고를 넣을 레이아웃 생성
```XML
 ...
   <FrameLayout
        android:id="@+id/abs"
        android:layout_width="match_parent"
        android:layout_height="100dp"
        android:layout_alignParentBottom="true">
   </FrameLayout>
 ...
```

#### 단계2. 레이아웃 생성
- AdlibManager 생성 및 초기화 이후 배너 광고 호출
- Activity Life Cycle에 맞게 AdlibManager 호출

```java
 ...
    private AdlibManager adlibManager;                                            // 애드립 매니저
    private FrameLayout abs;                                                      // 배너 광고 레이아웃

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_test1);

        // 배너 광고 레이아웃
        abs = (FrameLayout) findViewById(R.id.abs);

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

        // 배너 광고 로딩
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
 ...
```
