import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { WriterWrapper, WriterItem, WriterInfo, WriterTop, WriterSwitch, WriterAll } from '../style';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRedo } from '@fortawesome/free-solid-svg-icons';

class Writer extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        const { list } = this.props;
        return (
            <WriterWrapper>
                <WriterTop>
                    <span className='writerTitle'>推荐作者</span>
                    <WriterSwitch>
                        <FontAwesomeIcon icon={faRedo} className='redoFont' />
                        换一批
                    </WriterSwitch>
                </WriterTop>
                {
                    list.map((item) => {
                        return (
                            <WriterItem key={item.get('id')}>
                                <img src={item.get('imgUrl')} alt='' />
                                <WriterInfo>
                                    <span className='writerName'>{item.get('name')}</span>
                                    <p className='writerSesc'>{item.get('desc')}</p>
                                </WriterInfo>
                                <button>+ 关注</button>
                            </WriterItem>
                        )
                    })
                }
                <WriterAll>
                    显示全部
                </WriterAll>
            </WriterWrapper>
        );
    }
}

const mapStateToProps = (state) => ({
    list: state.getIn(['home', 'writerList'])
});

export default connect(mapStateToProps, null)(Writer);