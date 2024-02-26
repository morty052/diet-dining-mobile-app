import { View, Text, Pressable } from "react-native";
import Svg, { G, Path, Defs, ClipPath, SvgProps } from "react-native-svg";

const SvgComponent = (props: SvgProps) => (
  <Svg
    // @ts-ignore
    xmlns="http://www.w3.org/2000/svg"
    width={193}
    height={175}
    fill="none"
    {...props}
  >
    <Path
      fill="#fff"
      stroke="#231F20"
      strokeMiterlimit={10}
      d="m126.842 80.168-9.803-9.05-84.093 85.314a10.236 10.236 0 0 0 .343 14.752 10.266 10.266 0 0 0 14.7-.783l78.853-90.233Z"
    />
    <Path
      fill="#fff"
      stroke="#231F20"
      strokeMiterlimit={10}
      d="M131.001 83.925c10.283 0 18.618-8.336 18.618-18.618 0-10.283-8.335-18.619-18.618-18.619-10.283 0-18.618 8.336-18.618 18.619 0 10.282 8.335 18.618 18.618 18.618Z"
    />
    <Path
      fill="#fff"
      stroke="#231F20"
      strokeMiterlimit={10}
      d="M166.954 1.677a1.878 1.878 0 0 1 .486 2.021c-.085.23-.214.442-.381.623l-46.998 50.895-2.75-2.539 46.998-50.895a1.873 1.873 0 0 1 2.645-.105ZM191.562 24.395a1.874 1.874 0 0 1 .115 2.634l-46.998 50.895-2.744-2.534 46.998-50.895a1.869 1.869 0 0 1 2.644-.106l-.015.006ZM183.364 16.827a1.875 1.875 0 0 1 .105 2.644l-46.998 50.896-2.75-2.539 46.998-50.896a1.873 1.873 0 0 1 2.645-.105ZM175.159 9.252a1.875 1.875 0 0 1 .105 2.644l-46.998 50.896-2.75-2.54 46.998-50.895a1.873 1.873 0 0 1 2.645-.105Z"
    />
    <Path
      fill="#90C466"
      d="m152.777 157.711-65.62-92.295c7.528-3.296 9.034-7.997 9.034-13.852C96.191 22.274 54.093 0 22.273 0 7.683 0 0 6.352 0 6.352c11.528 6.506 27.186 23.94 36.053 43.297 8.055 17.602 15.511 29.773 26.812 29.773 6.813 0 11.045-4.32 13.34-7.756l59.43 97.354a10.27 10.27 0 0 0 17.142-11.309ZM81.001 64.875l-3.414 2.076a.593.593 0 0 1-.84-.263c-1.265-2.785-6.733-14.517-12.179-21.703-6.206-8.194-14.035-13.552-21.44-15.745 0 0 23.166.987 38.129 34.868a.607.607 0 0 1-.256.775v-.008Z"
    />
  </Svg>
);

export function SplashScreen({ navigation }: { navigation: any }) {
  return (
    <View className="flex-1 relative bg-primary pt-10  flex justify-center items-center">
      <View className="pb-40 space-y-6">
        <View className=" h-72 w-72 flex  items-center justify-center bg-light  rounded-full ">
          <SvgComponent />
        </View>
        <Text className="text-6xl font-black text-center tracking-wider  text-dark">
          Diet Dining
        </Text>

        <Pressable>
          <Text
            className="text-lg font-bold text-center tracking-wider  text-dark"
            onPress={() => navigation.navigate("App")}
          >
            Get Started
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
