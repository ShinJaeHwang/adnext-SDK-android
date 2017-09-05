# ADNext 전면 배너 적용 가이드
> ADNext 전면 배너 적용 방법에 대해 설명 드립니다. <br>

## 전면 배너 연동

### 단계1.기본 설정

#### ADNextManager 생성 및 사용
- ADNextManager 생성 및 초기화 이후 리스너 등록

```java
 ...
// 애드립 매니저 생성
//  - 애드립 앱 키값을 필수로 넣어주어야 합니다
adnextManager = new ADNextManager(this, ADNextTestProjectConstants.ADNEXT_API_KEY);

// 테스트 모드 셋팅
//  - 테스트 광고 노출로, 상용일 경우 꼭 제거해야 합니다
anextManager.setTestMode(ADNextTestProjectConstants.ADNEXT_TEST_MODE);

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
 ...
```

### 단계2.광고 호출
> 전면 배너 광고는 라이브러리에 포함됨 전면 광고 액티비티를 호출하여 보여주는 형태로 제공

- 전면 배너가 필요한 시점에 ADNextManager의 interstitialStart() 호출
```java
// 전면 광고 로딩
adnextManager.interstitialStart();
```

