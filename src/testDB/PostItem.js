import React,{Component} from 'react';
class PostItem extends Component{
    render() {
        const { title,author,date} = this.props;
        return (
            <div>
                <div>
                    { title }
                </div>
                <div>
                    创建人：<span>{ author }</span>
                </div>
                <div>
                    创建时间：<span>{ date }</span>
                </div>
            </div>
        );
    }
}
export default PostItem;

