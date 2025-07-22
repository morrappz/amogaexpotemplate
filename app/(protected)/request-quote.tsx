// import React, { useState, useEffect, useCallback, useMemo, use } from 'react';
// import {
// 	View,
// 	FlatList,
// 	Image,
// 	TextInput,
// 	TouchableOpacity,
// 	ActivityIndicator,
// 	ScrollView,
// 	SafeAreaView,
// 	Alert,
// 	BackHandler,
// } from 'react-native';
// import { Search, Plus, Minus, Trash2 } from 'lucide-react-native';
// import { wooApiFetch } from '@/lib/woocommerce';
// import { Input } from '@/components/elements/Input';
// import { useFocusEffect } from 'expo-router';
// import { Tabs, TabsList, TabsTrigger } from '@/components/elements/Tabs';
// import { Card, CardContent } from '@/components/elements/Card';
// import { Button } from '@/components/elements/Button';
// import { Text } from '@/components/elements/Text';
// import LucideIcon from '@/components/LucideIcon';
// import { useAuth } from '@/context/supabase-provider';

// // --- TYPES (Mostly the same, Order is now a Quote) ---
// type Product = { id: number; name: string; price: string; on_sale: boolean; stock_status: 'instock' | 'outofstock'; images: { src: string }[] };
// type QuoteItem = { product_id: number; quantity: number };
// type Customer = { id: number; first_name: string; last_name: string; email: string };
// type Quote = { id: number; date_created: string; line_items: { name: string; quantity: number; product_id: number }[]; status: string };

// const PER_PAGE = 20;

// // --- UI SUB-COMPONENTS (Mostly the same, with small text changes) ---

// const RequestTab = ({ products, onAddItem, loadMore, isLoading, onFilterChange, onSearch }) => {
// 	// This component is essentially the same as OrderingTab, just renamed props for clarity
// 	const [searchQueryRaw, setSearchQueryRaw] = useState("");
// 	useEffect(() => {
// 		const delay = setTimeout(() => onSearch(searchQueryRaw.trim()), 500);
// 		return () => clearTimeout(delay);
// 	}, [searchQueryRaw]);

// 	return (
// 		<View className="flex-1">
// 			<View className="p-4 border-b border-primary/15">
// 				<View className="relative">
// 					<Input placeholder="Search products..." value={searchQueryRaw} onChangeText={setSearchQueryRaw} className={`pl-8 pr-8 h-12 text-base`} />
// 					<View className="absolute right-2 top-1/2 transform -translate-y-1/2"><Search size={24} color="#6b7280" /></View>
// 				</View>
// 			</View>
// 			<FlatList
// 				data={products}
// 				keyExtractor={item => item.id.toString()}
// 				renderItem={({ item }) => (
// 					<Card className='rounded-lg m-4 mt-0 overflow-hidden'>
// 						<CardContent className='p-0'>
// 							<Image source={{ uri: item.images[0]?.src }} className="w-full h-48" />
// 							<View className="p-4 flex-row justify-between items-center">
// 								<View className="flex-1 mr-4">
// 									<Text className="text-lg font-bold" numberOfLines={1}>{item.name}</Text>
// 									{/* Price is removed from main view for a "quote" context, but can be kept if needed */}
// 								</View>
// 								<TouchableOpacity className="bg-gray-800 rounded-full p-3" onPress={() => onAddItem(item)}>
// 									<Plus size={24} color="#fff" />
// 								</TouchableOpacity>
// 							</View>
// 						</CardContent>
// 					</Card>
// 				)}
// 				onEndReached={loadMore}
// 				onEndReachedThreshold={0.7}
// 				ListFooterComponent={isLoading ? <ActivityIndicator size="large" className="my-8" /> : null}
// 				ListEmptyComponent={() => !isLoading && <Text className="text-center text-gray-500 mt-20">No products found.</Text>}
// 			/>
// 		</View>
// 	);
// };

// const ItemsTab = ({ quoteItems, products, updateQuantity, removeItem, onRequestQuote, onCancel }) => {
// 	const [customerSearch, setCustomerSearch] = useState('');
// 	const [foundCustomers, setFoundCustomers] = useState<Customer[]>([]);
// 	const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

// 	const itemDetails = useMemo(() => quoteItems.map(item => ({ ...item, product: products.find(p => p.id === item.product_id) })).filter(item => item.product), [quoteItems, products]);

// 	const handleSearchCustomers = async (query: string) => {
// 		setCustomerSearch(query);
// 		if (query.length < 2) { setFoundCustomers([]); return; }
// 		const results = await wooApiFetch('customers', { params: { search: query } });
// 		setFoundCustomers(results);
// 	};

// 	const selectCustomer = (customer: Customer) => {
// 		setSelectedCustomer(customer);
// 		setCustomerSearch(`${customer.first_name} ${customer.last_name}`);
// 		setFoundCustomers([]);
// 	};

// 	return (
// 		<ScrollView className="p-4">
// 			<Text className="text-3xl font-extrabold mb-6">Quote Items</Text>
// 			<View className="mb-6">
// 				<Text className="text-sm font-medium mb-2">Supplier</Text>
// 				<TextInput placeholder="Search for a supplier..." value={customerSearch} onChangeText={handleSearchCustomers} className="border border-gray-300 rounded-lg p-3 text-base" />
// 				{foundCustomers.length > 0 && (
// 					<View className="border border-gray-200 rounded-lg mt-1">
// 						{foundCustomers.map(cust => (
// 							<TouchableOpacity key={cust.id} className="p-3 border-b border-gray-100" onPress={() => selectCustomer(cust)}>
// 								<Text className="font-semibold">{cust.first_name} {cust.last_name}</Text>
// 								<Text className="text-sm">{cust.email}</Text>
// 							</TouchableOpacity>
// 						))}
// 					</View>
// 				)}
// 			</View>

// 			<View>
// 				{itemDetails.length > 0 ? (
// 					itemDetails.map(item => (
// 						<Card key={item.product_id} className='mt-2'>
// 							<CardContent className='p-3 flex-row items-center justify-between'>
// 								<Image source={{ uri: item.product.images[0]?.src }} className="w-16 h-16 rounded-md" />
// 								<View className="flex-1 mx-3">
// 									<Text className="text-base font-bold">{item.product.name}</Text>
// 									{/* Price removed, only quantity shown */}
// 									<Text className="text-sm mt-1">Quantity: {item.quantity}</Text>
// 								</View>
// 								<View className="flex-row items-center gap-3">
// 									<Button size="icon" variant="ghost" onPress={() => updateQuantity(item.product_id, -1)}><LucideIcon name='Minus' size={20} className='text-primary/40' /></Button>
// 									<Text className="text-lg font-bold w-8 text-center">{item.quantity}</Text>
// 									<Button size="icon" variant="ghost" onPress={() => updateQuantity(item.product_id, 1)}><LucideIcon name='Plus' size={20} className='text-primary/40' /></Button>
// 								</View>
// 								<Button size="icon" variant="ghost" onPress={() => removeItem(item.product_id)}><LucideIcon name="Trash2" size={20} className="text-destructive" /></Button>
// 							</CardContent>
// 						</Card>
// 					))
// 				) : (
// 					<Text className="text-center text-gray-500 mt-10">No items added to the quote request.</Text>
// 				)}
// 			</View>

// 			{/* Price Summary Removed */}

// 			<View className="flex-row gap-3 mt-8 mb-8">
// 				<Button variant="secondary" onPress={onCancel} className="flex-1 py-3.5"><Text className="text-base font-bold">Cancel</Text></Button>
// 				<Button onPress={() => onRequestQuote(selectedCustomer?.id)} disabled={!selectedCustomer || itemDetails.length === 0} className="flex-1 py-3.5"><Text className="text-base font-bold">Request Quote</Text></Button>
// 			</View>
// 		</ScrollView>
// 	);
// };

// const QuoteConfirmationScreen = ({ quote, onNewRequest }) => (
// 	<ScrollView className="flex-1 bg-background p-6">
// 		<View>
// 			<Text className="text-4xl font-extrabold">Thanks for your Quote Request!</Text>
// 			<Text className="text-lg mt-2">We will submit our quotation as soon as possible.</Text>
// 			<View className="p-5 rounded-xl mt-8 border border-gray-200">
// 				<Text className="text-2xl font-bold mb-4">Request Summary</Text>
// 				<View className="space-y-2">
// 					<View className="flex-row justify-between"><Text className="text-base">Date</Text><Text className="font-semibold text-base">{new Date(quote.created_at).toDateString()}</Text></View>
// 					<View className="flex-row justify-between"><Text className="text-base">Quote Number</Text><Text className="font-semibold text-base">#{quote.quote_id}</Text></View>
// 					<View className="flex-row justify-between"><Text className="text-base">Status</Text><Text className="font-semibold text-base capitalize">{quote.quote_status}</Text></View>
// 				</View>
// 				<View className="border-t border-gray-200 my-4" />
// 				<Text className="text-lg font-bold mb-2">Requested Items</Text>
// 				<View className="space-y-3">
// 					{quote.line_items.map(item => (
// 						<View key={item.product_id} className="flex-row items-center">
// 							{/* Here you'd need a way to get the product image, maybe from a products list prop */}
// 							<View className="flex-1">
// 								<Text className="font-bold text-base">{item.product_name}</Text>
// 							</View>
// 							<Text className="text-base">Qty: {item.quantity}</Text>
// 						</View>
// 					))}
// 				</View>
// 			</View>
// 		</View>
// 		<Button variant="default" onPress={onNewRequest} className="mt-8 py-4"><Text className="text-lg font-bold">New Quote Request</Text></Button>
// 	</ScrollView>
// );

// export default function RequestQuotePage() {
// 	const { session, userCatalog: userSession } = useAuth();
// 	const [activeScreen, setActiveScreen] = useState<'requesting' | 'submitted'>('requesting');
// 	const [activeTab, setActiveTab] = useState<'request' | 'items'>('request');

// 	const [products, setProducts] = useState<Product[]>([]);
// 	const [page, setPage] = useState(1);
// 	const [hasMore, setHasMore] = useState(true);
// 	const [isLoading, setIsLoading] = useState(false);
// 	const [isRefreshing, setIsRefreshing] = useState(false);

// 	const [filters, setFilters] = useState<Record<string, any>>({});
// 	const [quoteItems, setQuoteItems] = useState<QuoteItem[]>([]);
// 	const [lastQuote, setLastQuote] = useState<Quote | null>(null);

// 	// The BackHandler logic from your code
// 	useFocusEffect(
// 		React.useCallback(() => {
// 			const onBackPress = () => {
// 				if (activeTab === 'items') {
// 					setActiveTab('request');
// 					return true;
// 				}
// 				if (activeScreen === 'submitted') {
// 					setActiveScreen('requesting');
// 					setActiveTab('request');
// 					return true;
// 				}
// 				return false;
// 			};
// 			const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
// 			return () => subscription.remove();
// 		}, [activeTab, activeScreen])
// 	);

// 	const loadProducts = useCallback(async (isNewFilter = false) => {
// 		if (isLoading || isRefreshing) return;
// 		if (!isNewFilter && !hasMore) return;

// 		isNewFilter ? setIsRefreshing(true) : setIsLoading(true);
// 		const currentPage = isNewFilter ? 1 : page;

// 		try {
// 			const params = { ...filters, page: currentPage, per_page: PER_PAGE };
// 			const newProducts = await wooApiFetch('products', { params });
// 			setProducts(prev => isNewFilter ? newProducts : [...prev, ...newProducts]);
// 			setPage(currentPage + 1);
// 			setHasMore(newProducts && newProducts.length === PER_PAGE);
// 		} catch (error) {
// 			Alert.alert("Error", "Could not fetch products.");
// 		} finally {
// 			isNewFilter ? setIsRefreshing(false) : setIsLoading(false);
// 		}
// 	}, [isLoading, isRefreshing, page, hasMore, filters]);

// 	useEffect(() => {
// 		loadProducts(true);
// 	}, [filters]);

// 	const handleFilterChange = (key: string, value?: any) => {
// 		setFilters(prev => {
// 			const newFilters = { ...prev };
// 			if (key === 'clear') return {};
// 			if (key === 'search') {
// 				if (value) newFilters.search = value; else delete newFilters.search;
// 			} else {
// 				if (newFilters[key] === value) delete newFilters[key]; else newFilters[key] = value;
// 			}
// 			return newFilters;
// 		});
// 	};

// 	const handleAddItem = (product: any) => {
// 		const productId = typeof product === 'object' ? product.id : product;
// 		setQuoteItems(prev => {
// 			const existing = prev.find(item => item.product_id === productId);
// 			if (existing) {
// 				return prev.map(item => item.product_id === productId ? { ...item, quantity: item.quantity + 1 } : item);
// 			}
// 			return [...prev, { ...product, product_id: productId, quantity: 1 }];
// 		});
// 	};

// 	const handleUpdateQuantity = (productId: number, amount: number) => {
// 		setQuoteItems(prev => prev.map(item => item.product_id === productId ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item).filter(item => item.quantity > 0));
// 	};

// 	const handleRemoveItem = (productId: number) => setQuoteItems(prev => prev.filter(item => item.product_id !== productId));

// 	const handleRequestQuote = async (customerId: number) => {
// 		if (quoteItems.length === 0) return Alert.alert("No Items", "Please add items to your request.");
// 		if (!customerId) return Alert.alert("No Customer", "Please select a customer.");

// 		console.log("quoteItems", quoteItems)
// 		setIsLoading(true);
// 		try {
// 			const quoteData = {
// 				quote_status: "pending", // Or a custom status like 'quote-request'
// 				supplier_id: customerId,
// 				supplier_key: customerId.toString(),
// 				customer_key: "+0",
// 				line_items: quoteItems.map(item => ({ product_id: item.product_id, quantity: item.quantity, product_name: item.name })),
// 				for_business_number: userSession?.for_business_number || userSession?.business_number || "",
// 				for_business_name: userSession?.for_business_name || userSession?.business_name || "",
// 			};
// 			const newQuote: Quote = await wooApiFetch('quotes', { method: 'POST', body: quoteData }, "/woomorrintegration/v1");
// 			setLastQuote(newQuote);
// 			setQuoteItems([]);
// 			setActiveScreen('submitted');
// 		} catch (error) {
// 			Alert.alert("Request Failed", "Something went wrong. Please try again.");
// 		} finally {
// 			setIsLoading(false);
// 		}
// 	};

// 	if (activeScreen === 'submitted' && lastQuote) {
// 		return <QuoteConfirmationScreen quote={lastQuote} onNewRequest={() => { setActiveScreen('requesting'); setActiveTab('request'); }} />;
// 	}

// 	return (
// 		<SafeAreaView className="flex-1 bg-background">
// 			<Tabs value={activeTab} onValueChange={setActiveTab} className='w-full max-w-[400px] mx-auto flex-col gap-1.5'>
// 				<TabsList className='flex-row'>
// 					<TabsTrigger value='request' className='flex-1'><Text>Request</Text></TabsTrigger>
// 					<TabsTrigger value='items' className='flex-1'><Text>Items ({quoteItems.reduce((sum, item) => sum + item.quantity, 0)})</Text></TabsTrigger>
// 				</TabsList>
// 			</Tabs>

// 			{activeTab === 'request' ? (
// 				<RequestTab
// 					products={products} onAddItem={handleAddItem} loadMore={() => loadProducts(false)}
// 					isLoading={isLoading || isRefreshing}
// 					onSearch={(query) => handleFilterChange('search', query)}
// 					onFilterChange={handleFilterChange}
// 				/>
// 			) : (
// 				<ItemsTab
// 					quoteItems={quoteItems} products={products} updateQuantity={handleUpdateQuantity}
// 					removeItem={handleRemoveItem} onRequestQuote={handleRequestQuote}
// 					onCancel={() => setActiveTab('request')}
// 				/>
// 			)}
// 		</SafeAreaView>
// 	);
// }
