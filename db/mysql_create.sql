DROP TABLE IF EXISTS auth_info;
DROP TABLE IF EXISTS role_info;
DROP TABLE IF EXISTS menu_tree;
DROP TABLE IF EXISTS user_info;
DROP TABLE IF EXISTS role_menu;
DROP TABLE IF EXISTS role_auth;
DROP TABLE IF EXISTS user_role;
DROP TABLE IF EXISTS menu_auth;
DROP TABLE IF EXISTS bms_param;
DROP TABLE IF EXISTS org_info;
DROP TABLE IF EXISTS loan_journal;
DROP TABLE IF EXISTS loan_application;
DROP TABLE IF EXISTS loan_online;

/*==============================================================*/
/* Table: auth_info 权限信息                                    */
/*==============================================================*/
CREATE TABLE auth_info
(
  auth_id     INT NOT NULL AUTO_INCREMENT,
  auth_class  VARCHAR(50),
  auth_cn     VARCHAR(50),
  server_path VARCHAR(256),
  PRIMARY KEY (auth_id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

/*==============================================================*/
/* Table: role_info 角色信息                                    */
/* 管理员角色id小于1000普通角色Id大于1000                       */
/*==============================================================*/
CREATE TABLE role_info
(
  role_id      INT NOT NULL AUTO_INCREMENT,
  role_name    VARCHAR(50),
  role_desc    VARCHAR(128),
  role_creator VARCHAR(32),
  PRIMARY KEY (role_id)
)
  AUTO_INCREMENT = 1000
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

/*==============================================================*/
/* Table: menu_tree 菜单树                                      */
/*==============================================================*/
CREATE TABLE menu_tree
(
  menu_id    INT NOT NULL AUTO_INCREMENT,
  parent_id  INT,
  menu_text  VARCHAR(60),
  icon_text  VARCHAR(20),
  node_type  INT,
  url_text   VARCHAR(256),
  order_flag INT,
  PRIMARY KEY (menu_id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

/*==============================================================*/
/* Table: user_info 用户信息                                    */
/*==============================================================*/
CREATE TABLE user_info
(
  user_name     VARCHAR(32) NOT NULL,
  real_name     VARCHAR(32),
  pwd           VARCHAR(32),
  mobile_phone  VARCHAR(20),
  email         VARCHAR(32),
  sex           VARCHAR(1),
  state         VARCHAR(2),
  register_time VARCHAR(19),
  org_id        INT,
  org_path      VARCHAR(50),
  user_type     VARCHAR(1),
  PRIMARY KEY (user_name)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

/*==============================================================*/
/* Table: role_menu 角色目录关联表                              */
/*==============================================================*/
CREATE TABLE role_menu
(
  id      INT NOT NULL AUTO_INCREMENT,
  role_id INT NOT NULL,
  menu_id INT NOT NULL,
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

/*==============================================================*/
/* Table: role_auth 角色权限关联表                              */
/*==============================================================*/
CREATE TABLE role_auth
(
  id      INT NOT NULL AUTO_INCREMENT,
  role_id INT NOT NULL,
  auth_id INT NOT NULL,
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

/*==============================================================*/
/* Table: user_role 用户角色关联表                              */
/*==============================================================*/
CREATE TABLE user_role
(
  id        INT         NOT NULL AUTO_INCREMENT,
  role_id   INT         NOT NULL,
  user_name VARCHAR(32) NOT NULL,
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

/*==============================================================*/
/* Table: menu_auth 菜单权限关联表                              */
/*==============================================================*/
CREATE TABLE menu_auth
(
  id      INT NOT NULL AUTO_INCREMENT,
  menu_id INT NOT NULL,
  auth_id INT,
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

/*==============================================================*/
/* Table: bms_param 参数信息                                    */
/*==============================================================*/
CREATE TABLE bms_param
(
  param_name  VARCHAR(32) NOT NULL,
  param_value VARCHAR(1024),
  param_desc  VARCHAR(256),
  PRIMARY KEY (param_name)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

CREATE TABLE org_info (
  org_id         INT(32)      NOT NULL AUTO_INCREMENT,
  parent_id      INT(32)               DEFAULT NULL,
  org_code       VARCHAR(30)  NOT NULL,
  org_name       VARCHAR(100) NOT NULL,
  org_addr       VARCHAR(100)          DEFAULT NULL,
  org_manager    VARCHAR(30)           DEFAULT NULL,
  org_telephone  VARCHAR(20)           DEFAULT NULL,
  org_path       VARCHAR(50)           DEFAULT NULL,
  editor         VARCHAR(30)           DEFAULT NULL,
  approver       VARCHAR(30)           DEFAULT NULL,
  approval_time  VARCHAR(20)           DEFAULT NULL,
  last_edit_time VARCHAR(20)           DEFAULT NULL,
  edit_flag      VARCHAR(1)            DEFAULT NULL,
  area_code      VARCHAR(30)           DEFAULT NULL,
  PRIMARY KEY (org_id)
)
  ENGINE = InnoDB
  AUTO_INCREMENT = 208
  DEFAULT CHARSET = utf8;

/*==============================================================*/
/* Table: loan_application                                      */
/*==============================================================*/
CREATE TABLE loan_application
(
  loan_id           INT NOT NULL AUTO_INCREMENT,
  loan_journal      VARCHAR(32),
  org_id            INT,
  org_code          VARCHAR(30),
  org_name          VARCHAR(100),
  operator          VARCHAR(30),
  init_time         VARCHAR(20),
  distribution_time VARCHAR(20),
  examine_time      VARCHAR(20),
  return_time       VARCHAR(20),
  detail            VARCHAR(4000),
  PRIMARY KEY (loan_id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

/*==============================================================*/
/* Table: loan_journal                                          */
/*==============================================================*/
CREATE TABLE loan_journal
(
  id             INT NOT NULL AUTO_INCREMENT,
  online_id      INT,
  loan_id        INT,
  org_id         INT,
  org_code       VARCHAR(30),
  org_name       VARCHAR(100),
  process_name   VARCHAR(32),
  process_flag   VARCHAR(10),
  process_result VARCHAR(2),
  process_user   VARCHAR(32),
  process_status VARCHAR(2),
  init_time      VARCHAR(20),
  finish_time    VARCHAR(20),
  PRIMARY KEY (id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

/*==============================================================*/
/* Table: loan_online                                           */
/*==============================================================*/
CREATE TABLE loan_online
(
  online_id          INT NOT NULL AUTO_INCREMENT,
  loan_id            INT,
  cur_process_name   VARCHAR(32),
  cur_process_status VARCHAR(2),
  cur_process_user   VARCHAR(32),
  PRIMARY KEY (online_id)
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;
