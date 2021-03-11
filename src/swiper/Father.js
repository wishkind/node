class Father extends React.Component {
   sonRef = null;
   son1Ref = React.createRef();
   fancyRef = React.createRef();

   getSonRef = el => this.sonRef = el;

   sonFocus = () => {
       console.log(this.son1Ref.current);
   }

   fancyClick = () => {
       console.log(this.fancyRef.current);
   }

   render() {
       return (
           <div>
               <Protals />
               <Son bindRef={this.getSonRef} ref={this.son1Ref} />
               <button onClick={this.sonFocus}>father component</button>
               <FancyButton ref={this.fancyRef} onClick={this.fancyClick}>Fancy Button</FancyButton>
           </div>
       )
    }
}
