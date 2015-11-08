for var in "$@"
do
  convert tinvest_icon.png -resize "$var" icons/icon_"$var".png
done
