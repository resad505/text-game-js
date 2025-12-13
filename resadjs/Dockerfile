# 1. TEMEL İMAJI SEÇME
# Node.js'in resmi imajını kullanıyoruz. 'slim' veya 'alpine' gibi hafif versiyonları önerilir.
# Bu imaj, uygulamanızı çalıştırmak için gerekli Node.js çalışma zamanını içerir.
FROM node:20-slim

# 2. ÇALIŞMA DİZİNİ OLUŞTURMA
# Kapsayıcı (container) içinde tüm uygulama dosyalarının bulunacağı dizini ayarlar.
WORKDIR /usr/src/app

# 3. BAĞIMLILIKLARI YÜKLEME
# package.json ve package-lock.json dosyalarını kopyalar.
# Bu, sadece bu dosyalar değiştiğinde bağımlılık katmanının yeniden oluşturulmasını sağlar, 
# bu da imaj oluşturma süresini optimize eder (Layer Caching).
COPY package*.json ./

# 4. BAĞIMLILIKLARI KURMA
# Uygulama bağımlılıklarını kurar (node_modules bu katmanda oluşur).
RUN npm install

# 5. UYGULAMA KAYNAK KODUNU KOPYALAMA
# Geriye kalan tüm uygulama dosyalarını çalışma dizinine kopyalar.
COPY . .

# 6. PORTU BELİRTME
# Uygulamanızın dinleyeceği portu belirtir (bilgilendirme amaçlıdır).
EXPOSE 3000

# 7. UYGULAMAYI BAŞLATMA
# Kapsayıcı başlatıldığında çalıştırılacak varsayılan komutu belirler.
# Eğer uygulamanızın başlangıç komutu farklıysa (örneğin 'npm run start'), onu kullanın.
CMD [ "node", "server.js" ] 
# Ya da: CMD [ "npm", "start" ]