interface IProps {
  x?: number;
  y?: number;
  dx?: number;
  dy?: number;
  payload?: any; // recharts typescript not support payload arguments
  format?(item: number | string): string;
  textAnchor?: string;
}

const CustomAxisTick = ({
  x,
  y,
  dx,
  dy,
  payload,
  format,
  textAnchor,
}: IProps) => {
  const formattedValue = format
    ? `${format(payload.value as string)}`
    : String(payload.value);

  return (
    <g transform={`translate(${x}, ${y})`}>
      <text
        x={0}
        y={0}
        dx={dx}
        dy={dy}
        fontSize={"12px"}
        textAnchor={textAnchor}
        fill={"white"}
      >
        {formattedValue}
      </text>
    </g>
  );
};

export default CustomAxisTick;
