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

#### 단계1. ADNext 라이브러리 적용
* [AAR 다운로드 링크](../AAR)
- 위 링크에서 adnext.*.*.*.*.aar 파일을 다운 받아 프로젝트의 app/libs 폴더로 이동
- gradle에서 라이브러리 적용
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
