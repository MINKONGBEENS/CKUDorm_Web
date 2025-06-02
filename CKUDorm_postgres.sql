-- Table structure for table CKUDorm

DROP TABLE IF EXISTS CKUDorm;
CREATE TABLE CKUDorm (
  id SERIAL PRIMARY KEY,
  name varchar(50) NOT NULL,
  department_id int NOT NULL,
  grade int NOT NULL,
  student_id varchar(20) NOT NULL,
  phone varchar(20) NOT NULL,
  dormitory varchar(50) NOT NULL,
  room_number varchar(10) NOT NULL,
  password varchar(255) NOT NULL
);

-- Dumping data for table CKUDorm

INSERT INTO CKUDorm (name, department_id, grade, student_id, phone, dormitory, room_number, password) VALUES
('강민준',5,3,'20230521','01000991667','6생활관','6206','qOWS3YJUWL'),
('강지민',24,3,'20232418','01024336457','2생활관','2208','VD0mO1M372'),
('박지후',28,2,'20212816','01052327145','3생활관','3107','8ivwPQyJYd'),
('정하준',24,1,'20252456','01005852018','3생활관','3116','a3SjjiIhTL'),
('윤민준',26,2,'20242687','01040670525','5생활관','5109','bVxTQcOlXs'),
('강서연',12,2,'20211241','01043106959','4생활관','4104','1NeUD7WmQb'),
('박서윤',28,3,'20212846','01028141917','4생활관','4404','kBYrU7YOBN'),
('이예은',5,2,'20210567','01000412800','5생활관','5201','wj65I1o3pf'),
('김수빈',12,3,'20201230','01093315488','2생활관','2417','yrq8KkSw9n'),
('박민준',24,4,'20222487','01081620389','5생활관','5202','bCeO7MF8xM'),
('최하준',28,2,'20242879','01033189797','3생활관','3112','FufPu9usVk'),
('강지후',23,4,'20202302','01055321602','2생활관','2120','4xQ775wFFL'),
('임서연',12,2,'20201234','01011561935','6생활관','6111','pv04BY2QnX'),
('윤지후',5,4,'20220539','01068875985','4생활관','4207','9zJQ1hFyxh'),
('최현우',5,3,'20230542','01008559320','4생활관','4505','UDPH033zbr'),
('장현우',23,3,'20202301','01001338513','2생활관','2319','L1sA3bfOmZ'),
('정예은',26,2,'20202649','01093116875','6생활관','6112','Lq3bdGEEHZ'),
('최지민',5,3,'20230554','01092063305','4생활관','4412','sTYEKnpbLj'),
('조예은',5,2,'20240598','01087557988','4생활관','4210','xubzP4MGZi'),
('임하준',5,4,'20210590','01095424548','6생활관','6401','WFWiokBTht'),
('조수빈',26,4,'20212699','01035526156','2생활관','2105','DEO3xUNH7b'),
('이예은',12,4,'20211293','01055652974','2생활관','2101','SK5KDum0UK'),
('조지민',5,3,'20190506','01005248550','4생활관','4401','yiUABFWjvF'),
('이수빈',26,1,'20252605','01075301122','1생활관','1211','JfG8j7EcEB'),
('장민준',26,1,'20252649','01008249722','5생활관','5419','4chUCOCfak');

-- Table structure for table department

DROP TABLE IF EXISTS department;
CREATE TABLE department (
  id SERIAL PRIMARY KEY,
  name varchar(50) NOT NULL
);

-- Dumping data for table department

INSERT INTO department (id, name) VALUES
(5,'컴퓨터공학과'),
(12,'경영학과'),
(23,'전자공학과'),
(24,'기계공학과'),
(26,'화학공학과'),
(27,'산업공학과'),
(28,'소프트웨어학과'); 