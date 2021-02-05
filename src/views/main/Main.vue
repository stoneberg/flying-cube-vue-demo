<template>
  <div id="container">
    <!--s:lnb-->
    <Left />
    <!--e:lnb-->
    <!--main content-->
    <div class="main_contents_scroll">
      <!--s:클러스터 현황-->
      <div class="cluster_present">
        <div class="top">
          <h3>Cluster 현황</h3>
          <ul class="tab_area">
            <li class="on">천안</li>
            <li>여의도</li>
            <li>목동</li>
            <li>분당</li>
          </ul>
        </div>
        <div class="title">
          <span class="label_area">천안</span>ClusterABC - DEV
        </div>
        <ul class="progress_step">
          <li class="on">1</li>
          <li>2</li>
          <li>3</li>
        </ul>
        <ul class="present_box">
          <li class="prev">이전</li>
          <li class="amount_box">
            <div class="amount_01">
              <dl class="total">
                <dt>수용 서비스 수</dt>
                <dd>5</dd>
              </dl>
            </div>
            <div class="amount_02">
              <dl class="total">
                <dt>노드 개수</dt>
                <dd>20</dd>
              </dl>
            </div>
            <div class="amount_03">
              <dl class="total">
                <dt>프로젝트 개수</dt>
                <dd>30</dd>
              </dl>
            </div>
          </li>
          <li class="next">다음</li>
        </ul>
      </div>
      <!--e:클러스터 현황-->
      <!--s:나의 신청-->
      <div class="dtb_title">
        <h3>나의 신청<small>최근 3건</small></h3>
        <a href="" class="more">더보기</a>
      </div>
      <table class="type_dtb">
        <caption>
          배포 신청 목록
        </caption>
        <colgroup>
          <col width="120px" />
          <col width="120px" />
          <col width="*" />
          <col width="130px" />
          <col width="130px" />
        </colgroup>
        <thead>
          <tr>
            <th>배포 환경</th>
            <th>배포 종류</th>
            <th>신청 제목</th>
            <th>상태</th>
            <th>신청일자</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <ul class="env_dtb">
                <li><span class="bul_dtb dev">DEV</span></li>
                <li><span class="bul_dtb stg">STG</span></li>
              </ul>
            </td>
            <td>정기배포</td>
            <td class="left">테스트1</td>
            <td>승인완료</td>
            <td>2019-03-08</td>
          </tr>
          <tr>
            <td>
              <ul class="env_dtb">
                <li><span class="bul_dtb stg">STG</span></li>
                <li><span class="bul_dtb prd">PRD</span></li>
              </ul>
            </td>
            <td>비정기배포</td>
            <td class="left">테스트3</td>
            <td>배포 신청</td>
            <td>2019-03-02</td>
          </tr>
          <tr>
            <td>
              <ul class="env_dtb">
                <li><span class="bul_dtb dev">DEV</span></li>
                <li><span class="bul_dtb prd">PRD</span></li>
              </ul>
            </td>
            <td>긴급배포</td>
            <td class="left">테스트2</td>
            <td>배포 신청</td>
            <td>2019-03-02</td>
          </tr>
        </tbody>
      </table>
      <!--e:나의 신청-->
      <!--s:paging-->
      <div class="paging_box main">
        <ul class="paging">
          <li><a href="#" class="ppv dis">맨앞</a></li>
          <li><a href="#" class="pv dis">앞</a></li>
          <li class="on"><a href="#">1</a></li>
          <li><a href="#">2</a></li>
          <li><a href="#">3</a></li>
          <li><a href="#">4</a></li>
          <li><a href="#">5</a></li>
          <li><a href="#" class="nv">뒤</a></li>
          <li><a href="#" class="nnv">맨뒤</a></li>
        </ul>
      </div>
      <!--e:paging-->
      <!--s:나의 할일-->
      <div class="dtb_title">
        <h3>나의 할일<small>최근 3건</small></h3>
        <a href="" class="more">더보기</a>
      </div>
      <table class="type_dtb">
        <caption>
          배포 신청 목록
        </caption>
        <colgroup>
          <col width="120px" />
          <col width="120px" />
          <col width="*" />
          <col width="130px" />
          <col width="130px" />
        </colgroup>
        <thead>
          <tr>
            <th>배포 환경</th>
            <th>배포 종류</th>
            <th>신청 제목</th>
            <th>상태</th>
            <th>신청일자</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <ul class="env_dtb">
                <li><span class="bul_dtb dev">DEV</span></li>
                <li><span class="bul_dtb stg">STG</span></li>
              </ul>
            </td>
            <td>정기배포</td>
            <td class="left">테스트1</td>
            <td>승인완료</td>
            <td>2019-03-08</td>
          </tr>
          <tr>
            <td>
              <ul class="env_dtb">
                <li><span class="bul_dtb dev">DEV</span></li>
                <li><span class="bul_dtb prd">PRD</span></li>
              </ul>
            </td>
            <td>긴급배포</td>
            <td class="left">테스트2</td>
            <td>배포 신청</td>
            <td>2019-03-02</td>
          </tr>
          <tr>
            <td>
              <ul class="env_dtb">
                <li><span class="bul_dtb stg">STG</span></li>
                <li><span class="bul_dtb prd">PRD</span></li>
              </ul>
            </td>
            <td>비정기배포</td>
            <td class="left">테스트3</td>
            <td>배포 신청</td>
            <td>2019-03-02</td>
          </tr>
        </tbody>
      </table>
      <!--e:나의 할일-->
      <!--s:paging-->
      <div class="paging_box main">
        <ul class="paging">
          <li><a href="#" class="ppv dis">맨앞</a></li>
          <li><a href="#" class="pv dis">앞</a></li>
          <li class="on"><a href="#">1</a></li>
          <li><a href="#">2</a></li>
          <li><a href="#">3</a></li>
          <li><a href="#">4</a></li>
          <li><a href="#">5</a></li>
          <li><a href="#" class="nv">뒤</a></li>
          <li><a href="#" class="nnv">맨뒤</a></li>
        </ul>
      </div>
      <!--e:paging-->
      <div class="board_box">
        <!--s:공지사항-->
        <div class="main_board notice">
          <div class="title">
            <h3>공지사항</h3>
            <a href="" class="more">더보기</a>
          </div>
          <div class="contents">
            <table class="type_board">
              <tbody>
                <tr>
                  <td><a href="">인프라 추가기능설정 메뉴얼</a></td>
                  <td>2019-03-08</td>
                </tr>
                <tr>
                  <td>
                    <a href="">IPC 자원 최적화 기능 메뉴얼</a>
                  </td>
                  <td>2019-03-04</td>
                </tr>
                <tr>
                  <td>
                    <a href="">IPC 운영이관 전 준비사항</a>
                  </td>
                  <td>2019-02-28</td>
                </tr>
                <tr>
                  <td>
                    <a href="">공지사항입니다.</a>
                  </td>
                  <td>2019-02-15</td>
                </tr>
                <tr>
                  <td>
                    <a href="">공지사항입니다.</a>
                  </td>
                  <td>2019-02-11</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!--e:공지사항-->
        <!--s:자주하는 질문-->
        <div class="main_board faq">
          <div class="title">
            <h3>자주하는 질문</h3>
            <a href="" class="more">더보기</a>
          </div>
          <div class="contents">
            <table class="type_board">
              <tbody>
                <tr>
                  <td>
                    <a href="">인프라 추가기능설정 메뉴얼</a>
                  </td>
                  <td>2019-03-08</td>
                </tr>
                <tr>
                  <td>
                    <a href="">IPC 자원 최적화 기능 메뉴얼</a>
                  </td>
                  <td>2019-03-04</td>
                </tr>
                <tr>
                  <td>
                    <a href="">IPC 운영이관 전 준비사항</a>
                  </td>
                  <td>2019-02-28</td>
                </tr>
                <tr>
                  <td>
                    <a href="">공지사항입니다.</a>
                  </td>
                  <td>2019-02-15</td>
                </tr>
                <tr>
                  <td>
                    <a href="">공지사항입니다.</a>
                  </td>
                  <td>2019-02-11</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <!--e:자주하는 질문-->
      </div>
    </div>
    <!--e:main content-->
  </div>
</template>

<script>
import Left from '@/components/layout/Left.vue';

export default {
  name: 'Main',
  components: {
    Left
  }
};
</script>
