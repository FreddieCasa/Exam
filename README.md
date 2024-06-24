# Exam

Create DB:
        user: root
        pwd: student

        CMD:
        cd D:\Program Files\MySQL\MySQL Server 8.4\bin
        mysql -u root -p
        create database bookdb

Run backend:

        CMD:
        cd bookrecommendation
        mvn spring-boot:run

Run frontend:

        CMD:
        cd book-recommendation-app
        npm run dev
