import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { DownloadWrapper,DownloadInfo } from '../style';

class DownloadApp extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <DownloadWrapper>
                <img src='//cdn2.jianshu.io/assets/web/download-index-side-qrcode-cb13fc9106a478795f8d10f9f632fccf.png' alt=''/>
                <DownloadInfo>
                    <p className='downApp'>下载简书手机App ></p>
                    <span className='downDesc'>随时随地发现和创作内容</span>
                </DownloadInfo>
            </DownloadWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    
})

export default connect(mapStateToProps, null)(DownloadApp);