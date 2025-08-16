function Grid({ children, gap = '30px', min = '300px', sx, max }) {
    return (
        <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${'auto-fit'}, minmax(${min}, 1fr))`,
            maxWidth: max && `calc(${max} * ${min})`,
            gap: gap, justifyItems: 'center', alignContent: 'center', ...sx
        }}>
            {children}
        </div>
    )
}

export default Grid
