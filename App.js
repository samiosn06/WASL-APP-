import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Animated, TouchableOpacity, ScrollView, SafeAreaView, StatusBar } from 'react-native';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0.4)).current;

  // تأثير الوميض الرسمي لشعار WASL APP
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, { toValue: 1, duration: 1500, useNativeDriver: true }),
        Animated.timing(fadeAnim, { toValue: 0.4, duration: 1500, useNativeDriver: true }),
      ])
    ).start();

    // انتقال تلقائي بعد شاشة الترحيب الذهبية
    const timer = setTimeout(() => setIsLoaded(true), 3000);
    return () => clearTimeout(timer);
  }, [fadeAnim]);

  // 1. شاشة الترحيب (التي أكدت نجاح الدخول واستعادة العناصر)
  if (!isLoaded) {
    return (
      <View style={styles.splashContainer}>
        <StatusBar barStyle="light-content" />
        <Animated.Text style={[styles.logoText, { opacity: fadeAnim }]}>WASL APP</Animated.Text>
        <View style={styles.statusBox}>
          <Text style={styles.statusTitle}>✓ تم فعال</Text>
          <Text style={styles.statusDetail}>تم استعادة كافة العناصر المحذوفة</Text>
        </View>
      </View>
    );
  }

  // 2. لوحة التحكم الحقيقية (التي تحل محل النسخة المشوهة)
  return (
    <SafeAreaView style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Animated.Text style={[styles.headerLogo, { opacity: fadeAnim }]}>WASL APP</Animated.Text>
        <Text style={styles.slogan}>وصل اب يجمعنا</Text>
      </View>

      <ScrollView contentContainerStyle={styles.menuGrid}>
        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}>🌍</Text>
          <Text style={styles.menuLabel}>الخريطة</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}>✈️</Text>
          <Text style={styles.menuLabel}>طائرتنا</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}>📦</Text>
          <Text style={styles.menuLabel}>شحناتي</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.menuItem}>
          <Text style={styles.menuIcon}>💬</Text>
          <Text style={styles.menuLabel}>تواصل معنا</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>حقوق الطبع والنشر ٢٠٢٦ - واصل</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  splashContainer: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  logoText: { fontSize: 45, fontWeight: 'bold', color: '#FFD700', letterSpacing: 4 },
  statusBox: { marginTop: 20, alignItems: 'center' },
  statusTitle: { color: '#4BB543', fontSize: 20, fontWeight: 'bold' },
  statusDetail: { color: '#888', fontSize: 14 },
  mainContainer: { flex: 1, backgroundColor: '#050505' },
  header: { backgroundColor: '#111', padding: 35, alignItems: 'center', borderBottomWidth: 1, borderBottomColor: '#FFD700' },
  headerLogo: { color: '#FFD700', fontSize: 26, fontWeight: 'bold' },
  slogan: { color: '#fff', fontSize: 14, marginTop: 5 },
  menuGrid: { padding: 20, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  menuItem: { 
    backgroundColor: '#1a1a1a', 
    width: '46%', 
    height: 150, 
    borderRadius: 20, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#333'
  },
  menuIcon: { fontSize: 40, marginBottom: 10 },
  menuLabel: { fontSize: 16, fontWeight: 'bold', color: '#fff' },
  footer: { padding: 15, alignItems: 'center' },
  footerText: { color: '#555', fontSize: 11 }
});