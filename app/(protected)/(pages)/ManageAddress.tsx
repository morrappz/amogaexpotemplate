import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import BillingAddress from "./Address/BillingAddress";
import ShippingAddress from "./Address/ShippingAddress";

const Tab = createMaterialTopTabNavigator();

export default function ManageAddress() {
	return (
		<Tab.Navigator
			screenOptions={{
				tabBarLabelStyle: { fontSize: 14, fontWeight: "bold" },
				tabBarIndicatorStyle: { backgroundColor: "black" },
				tabBarActiveTintColor: "black",
				tabBarInactiveTintColor: "gray",
				tabBarStyle: { backgroundColor: "transparent" },
			}}
		>
			<Tab.Screen name="Billing" component={BillingAddress} />
			<Tab.Screen name="Shipping" component={ShippingAddress} />
		</Tab.Navigator>
	);
}
