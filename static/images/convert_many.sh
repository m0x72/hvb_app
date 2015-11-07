for var in "$@"
do
  convert crowdtv_icon_high.png -resize "$var" icons/icon_"$var".png
done
