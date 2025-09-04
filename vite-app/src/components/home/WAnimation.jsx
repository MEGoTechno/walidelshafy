export default WAnimation

function WAnimation({ sx }) {
    return (
        <div className="content" style={{ ...sx }}>
            <div className="image-container">
                <img src="/assets/w-animate.png" alt="outer" />
                <img src="/assets/inner-logo.png" alt="inner" />
                <div className="bubbles">
                    {Array.from({ length: 14 }).map((_, i) => (
                        <div key={i} className={"bubble " + (i > 6 && 'reverse')}></div>
                    ))}
                </div>
            </div>
        </div>
    );
}

