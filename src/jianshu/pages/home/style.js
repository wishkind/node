import styled from 'styled-components';

// 首页外层容器
export const HomeWrapper = styled.div`
    overflow：hidden;
    width: 960px;
    margin: 0 auto;
`

export const HomeLeft = styled.div`
    margin-left: 15px;
    padding-top: 30px;
    width: 625px;
    float: left;
    .banner-img{
        width: 640px;
        height: 270px;
    }
`

export const HomeRight = styled.div`
    width: 280px;
    float: right;
`

// 热门专题TopicWrapper
export const TopicWrapper = styled.div`
    overflow:hidden;
    padding: 20px 0 10px 0;
    margin-left: -18px;
    border-bottom: 1px solid #dcdcdc;
`

export const TopicItem = styled.div`
    float: left;
    height: 32px;
    line-height: 32px;
    margin-left: 18px;
    margin-bottom: 18px;
    padding-right: 10px;
    background: #f7f7f7;
    font-size: 14px;
    color: #000;
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    .topic-pic{
        display: block;
        float: left;
        width: 32px;
        height: 32px;
        margin-right: 10px;
    }
`

export const MoreTopic = styled.div`
    float: left;
    font-size: 14px;
    color: #777;
    height: 32px;
    line-height: 32px;
    margin-left: 18px;
    cursor:pointer;
`

// 文章列表
export const ListItem = styled.div`
    overflow: hidden;
    display: flex;
    padding: 20px 0;
    border-bottom: 1px solid #dcdcdc;
    .pic{
        display: block;
        width: 125px;
        height: 100px;
        border-radius: 5px;
    }
`

export const ListInfo = styled.div`
    width: 500px;
    margin-right:40px;
    .title {
        line-height: 27px;
        font-size: 18px;
        font-weight: bold;
    }
    .desc {
        line-height: 24px;
        font-size: 12px;
        color: #999;
    }
`

export const ListMeta = styled.div`
   
`

export const LoadMore = styled.div`
    width: 100%;
    height: 40px;
    color: #fff;
    line-height: 40px;
    margin: 30px 0;
    background: #a5a5a5;
    text-align: center;
    border-radius: 20px;
    cursor: pointer;
`

// 推荐列表
export const RecommendWrapper = styled.div`
    margin: 22px 0;
    width: 280px;
`

export const RecommendItem = styled.div`
    width: 280px;
    height: 50px;
    background: url(${(props) => props.imgUrl});
    background-size: contain;
`

// 下载App
export const DownloadWrapper = styled.div`
    display: flex;
    align-items: center;
    width: 278px;
    border-radius: 3px;
    border: 1px solid #dcdcdc;
    margin-bottom: 20px;
    padding: 10px 22px;
    box-sizing: border-box;
    cursor: pointer;
    img{
        width: 60px;
        height: 60px;
    }
`

export const DownloadInfo = styled.div`
    padding-left: 20px;
    .downApp{
        font-size: 15px;
        color: #333;
        margin-bottom: 4px;
    }
    .downDesc{
        font-size: 13px;
        color: #999;
    }
`

// 作者列表
export const WriterWrapper = styled.div`
    width: 278px;
    border-radius: 3px;
    .writerTitle{
        font-size: 14px;
        color: #969696;
    }
`

export const WriterItem = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-top: 15px;
    cursor: pointer;
    img{
        width: 48px;
        height: 48px;
        border: 1px solid #ddd;
        border-radius: 50%;
    }
    button{
        margin-top: 5px;
        font-size: 13px;
        color: #42c02e;
        background: transparent;
        border: none;
        padding: 0;
    }
`

export const WriterInfo = styled.div`
    padding-top: 5px;

    .writerName{
        font-size: 15px;
    }
    .writerSesc{
        margin-top: 2px;
        font-size: 12px;
        color: #969696;
    }
`

export const WriterTop = styled.div`
    display: flex;
    justify-content: space-between;
`

export const WriterSwitch = styled.div`
    color: #787878;
    display: inline-block;
    font-size: 14px;
    cursor: pointer;
    .redoFont {
        font-size: 12px;
        margin-right: 4px;
    }
`

export const WriterAll = styled.div`
    width: 100%;
    font-size: 13px;
    color: #787878;
    margin: 30px 0;
    background: #f7f7f7;
    border: 1px solid #dcdcdc;
    padding: 7px 7px 7px 12px;
    box-sizing: border-box;
    text-align: center;
    border-radius: 4px;
    cursor: pointer;
`

// 返回顶部
export const BackTop = styled.div`
    position: fixed;
    right: 100px;
    bottom: 100px;
    width: 60px;
    height: 60px;
    line-height: 60px;
    text-align: center;
    border: 1px solid #ccc;
    border-radius: 50%;
    font-size: 14px;
    color: #aaa;
    cursor: pointer;
`