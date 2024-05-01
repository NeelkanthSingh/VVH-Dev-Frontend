const Header = () => {
  return (
    <div className="navbar bg-base-100 text-base-content sticky top-0 z-30 flex h-16 w-full bg-opacity-90 backdrop-blur transition-shadow duration-100 [transform:translate3d(0,0,0)] shadow-sm">
      <img alt="Realtime Colors" className="h-12 w-12 bg-blend-normal" src="/logo.png" />
      <a className="btn btn-active btn-accent text-xl">VersionVaultHub</a>
    </div>
  );
};

export default Header;