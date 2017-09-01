# ADNext 띠 배너 적용 가이드
> ADNext 띠배너 적용 방법에 대해 설명 드립니다. <br>

## 띠 배너 연동

### 단계1.기본 설정

#### AdlibManager 생성 및 사용
- AdlibManager 생성 및 초기화 이후 리스너 등록

```java
 ...
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
 ...
```

### 단계2. 광고 호출 방법
> 광고 호출 방법은  XML과 View 동적 생성 형태 제공

#### 1. XML 사용
- 광고 노출이 필요한 Activity XML 에 레이아웃을 추가
- AdlibManager 띠 배너 로드

```xml
   <FrameLayout
        android:id="@+id/abs"
        android:layout_width="match_parent"
        android:layout_height="50dp"
        android:layout_alignParentBottom="true">
   </FrameLayout>

// 띠 배너 로드
adlibManager.bannerViewLoad(abs);

```

#### 2. 동적 생성
- 광고 뷰를 넣을 레이아웃을 동적으로 생성하여 광고를 노출
- AdlibManager 뷰 설정 및 미디에이션 광고 시작

```java
// 레이아웃 동적 생성
LinearLayout adView = new LinearLayout(this);
// 레이아웃 사이즈 설정
adView.setLayoutParams(new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, 100));

...

// 띠 배너 로드
adlibManager.bannerViewLoad(adView);
```

- 동적 생성의 경우 광고 영역 삭제가 필요한 경우

```java
// 띠 배너 삭제
adlibManager.destoryBannerView();
```
