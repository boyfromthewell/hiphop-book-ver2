> _아주 예전에 바닐라 자바스크립트로 만들었던 귀여운 나의
[힙합가수 사전](https://velog.io/@boyfromthewell/JAVA-SCRIPT-%EB%B0%94%EB%8B%90%EB%9D%BC-%EC%9E%90%EB%B0%94%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8%EB%A1%9C-%EB%A7%8C%EB%93%A0-%ED%9E%99%ED%95%A9%EA%B0%80%EC%88%98-%EC%A3%BC%EC%86%8C%EB%A1%9D) 을 리액트를 조금이나마 배운 기념으로 리액트로 다시 업그레이드 해보았다. 완성한지는 꽤 되었는데 귀찮아서 안올렸었다._

렌더링하는데 필요한 데이터는 정적 json 파일을 사용하지 않고, `Postman`이라는 프로그램으로 api를 구축하였다. 
데이터를 더 많이 넣고 싶었는데 귀찮다......약 15개의 데이터가 들어있다
axios get으로 데이터를 받아왔다.
***
# 메인화면
![](https://images.velog.io/images/boyfromthewell/post/6a429d93-184d-4fc7-87c8-7ab6f9d11cf2/ezgif.com-gif-maker%20(12).gif)  
초기화면은 그냥 허전해서 내사랑 침아조씨를 넣었다.
***
## 데이터 필터링 버튼
![](https://images.velog.io/images/boyfromthewell/post/c01cd5e4-5c3e-4750-8286-39e6a01aac71/J.png)  
각각의 버튼을 눌렀을시 버튼의 value와 가수 이름의 첫글자가 일치하는 데이터만 필터링하게 하였다.  
J 버튼을 눌렀을때의 모습 (정상수 죄송합니다...)

![](https://images.velog.io/images/boyfromthewell/post/a43590bc-e8a4-4938-a440-84b93e8343e6/image.png)  
숫자로 시작하는 이름은 etc 버튼에서 렌더링 하게 하였고, 맨 첫글자가 정수인 경우만 필터링 되게 하였다.
![](https://images.velog.io/images/boyfromthewell/post/3ebff068-2a77-493a-9f6e-ab982ae9810c/image.png)  
데이터가 렌더링 되는 횟수를 체크해 카운트가 0이면 해당하는 데이터가 없다고 출력되게 하였다.

### 자동완성 검색창

![](https://images.velog.io/images/boyfromthewell/post/2e547bdf-bea3-419a-972f-d7c4d1ba1055/image.png)  
웹사이트에 흔히 있는 자동완성 검색창도 구현했다. 해당 검색결과를 누르면 바로 상세페이지로 이동 한다.
***
## 상세 페이지

![](https://images.velog.io/images/boyfromthewell/post/075c938a-aa4e-4fd9-9e89-af004dcd9694/image.png)  
필터링된 가수이름을 클릭하면 상세 페이지로 이동하게 하였다.

![](https://images.velog.io/images/boyfromthewell/post/934719e4-081f-487e-aaee-6d486c23c13c/image.png)  
해당 가수의 이름, 설명이 나온다. 영상은 허전해서 `react-player` 라이브러리를 통해 관련된 영상을 넣어주었다. 설명은 대충 나무위키 긁어서 다 넣어줬다.

![](https://images.velog.io/images/boyfromthewell/post/1bc8c830-483c-447e-9eda-95df25dc270e/image.png)  
인스타그램 아이콘을 클릭하면 새 브라우져에서 해당 가수의 SNS를 띄우게 하였다.

### 간단한 댓글 기능

![](https://images.velog.io/images/boyfromthewell/post/91072f80-fb92-4084-8171-37b4365cd507/ezgif.com-gif-maker%20(13).gif)  

`localStorage`를 이용해 간단한 댓글기능을 만들었다. `Date` 객체를 이용해 댓글을 등록한 시간도 렌더링 되게 하였다.  
`localStorage`를 사용했기 때문에 댓글 데이터가 내 pc에서는 그대로 남아있지만 다른 사람이 쓴것은 볼 수 없다!! 정말 댓글창처럼 만들고 싶었는데 아쉬운 부분이다 더 공부해야겠다.
***
## 페이지네이션

![](https://images.velog.io/images/boyfromthewell/post/fffc1abd-0b7f-43bd-8150-c7b3a56a562f/image.png)  
View All 버튼을 클릭했을때 데이터 5개씩 페이지네이션이 되도록 구현하였다.  
https://www.daleseo.com/react-pagination/ 에서 많이 참고 하였다. 페이지네이션 라이브러리도 있다는데 찾아 봐야겠다!!
***
>#### 배포 링크 https://boyfromthewell.github.io/hiphop-book-ver2/

>_본 토이프로젝트를 하면서 자바스크립트 지식의 중요성을 더 실감하게 되었고 자바스크립트를 정말 잘 알고 있어야 좋은 프론트엔드 개발자가 될거같다는 느낌이 많이 들었다. 리액트를 알게되고 처음으로 만들어본 귀여운 프로젝트지만 많이 배웠고, 재밌었다_

