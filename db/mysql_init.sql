/* 初始化menu_tree */
INSERT INTO `menu_tree` VALUES ('1', null, '监控', 'r', '0', null, null);
INSERT INTO `menu_tree` VALUES ('2', '1', '开发维护', 'fa-tasks', '0', null, null);
INSERT INTO `menu_tree` VALUES ('3', '2', '菜单管理', '', '1', '/nfcm/menu/menu.html', null);
INSERT INTO `menu_tree` VALUES ('4', '2', '参数配置管理', '', '1', '/nfcm/param/param.html', null);
INSERT INTO `menu_tree` VALUES ('5', '1', '基础管理', 'icon-group', '0', null, null);
INSERT INTO `menu_tree` VALUES ('6', '5', '机构管理', '', '1', '/nfcm/org/org.html', null);
INSERT INTO `menu_tree` VALUES ('7', '5', '权限管理', '', '1', '/nfcm/role/role.html', null);
INSERT INTO `menu_tree` VALUES ('8', '5', '人员管理', '', '1', '/nfcm/user/user.html', null);
INSERT INTO `menu_tree` VALUES ('9', '1', '贷款申请管理', 'icon-file-text', '0', '', null);
INSERT INTO `menu_tree` VALUES ('10', '9', '贷款申请与查询', '', '1', '/nfcm/loanAppCommit/loanAppCommit.html', null);
INSERT INTO `menu_tree` VALUES ('11', '9', '贷款进件处理', '', '1', '/nfcm/loanAppDistribute/loanAppDistribute.html', null);
INSERT INTO `menu_tree` VALUES ('12', '9', '贷款审查处理', '', '1', '/nfcm/loanAppExamine/loanAppExamine.html', null);
INSERT INTO `menu_tree` VALUES ('13', '9', '贷款审批处理', '', '1', '/nfcm/loanApp2Examine/loanApp2Examine.html', null);
/* 初始化auth_info */
INSERT INTO `auth_info` VALUES ('100', '菜单管理', '查询', '/menu/queryMenuTreeAll.action');
INSERT INTO `auth_info` VALUES ('101', '菜单管理', '修改', '/menu/updateMenu.action');
INSERT INTO `auth_info` VALUES ('102', '菜单管理', '添加', '/menu/addMenu.action');
INSERT INTO `auth_info` VALUES ('103', '菜单管理', '删除', '/menu/removeMenu.action');
INSERT INTO `auth_info` VALUES ('110', '参数配置管理', '查询', '/param/findParam.action');
INSERT INTO `auth_info` VALUES ('111', '参数配置管理', '查询', '/param/findParamById.action');
INSERT INTO `auth_info` VALUES ('112', '参数配置管理', '添加', '/param/addParam.action');
INSERT INTO `auth_info` VALUES ('113', '参数配置管理', '修改', '/param/updateParam.action');
INSERT INTO `auth_info` VALUES ('114', '参数配置管理', '删除', '/param/removeParam.action');
INSERT INTO `auth_info` VALUES ('115', '参数配置管理', '删除', '/param/removeParams.action');
INSERT INTO `auth_info` VALUES ('120', '机构管理', '查询所有机构信息', '/org/queryApprovedOrgInfos.action');
INSERT INTO `auth_info` VALUES ('121', '机构管理', '添加机构信息', '/org/addOrgInfo.action');
INSERT INTO `auth_info` VALUES ('122', '机构管理', '修改机构信息', '/org/updateOrgInfo.action');
INSERT INTO `auth_info` VALUES ('123', '机构管理', '删除机构信息', '/org/removeOrgInfo.action');
INSERT INTO `auth_info` VALUES ('124', '机构管理', '查询单个机构信息', '/org/queryOrgInfo.action');
INSERT INTO `auth_info` VALUES ('125', '机构管理', '查询机构是否可以删除', '/org/checkIsRemoveOrg.action');
INSERT INTO `auth_info` VALUES ('126', '机构管理', '根据父节点查询机构信息', '/org/queryOrgInfoByParentId.action');
INSERT INTO `auth_info` VALUES ('130', '权限管理', '查询', '/role/findByCondition.action');
INSERT INTO `auth_info` VALUES ('131', '权限管理', '查询', '/role/beforeUpdateRole.action');
INSERT INTO `auth_info` VALUES ('132', '权限管理', '查询', '/role/checkCanRemoveRole.action');
INSERT INTO `auth_info` VALUES ('133', '权限管理', '查询', '/role/beforeUpdateRole.action');
INSERT INTO `auth_info` VALUES ('134', '权限管理', '查询', '/role/loadAuthorityCheckTree.action');
INSERT INTO `auth_info` VALUES ('135', '权限管理', '添加', '/role/addRole.action');
INSERT INTO `auth_info` VALUES ('136', '权限管理', '修改', '/role/updateRole.action');
INSERT INTO `auth_info` VALUES ('137', '权限管理', '修改', '/role/updateRoleEditFlag.action');
INSERT INTO `auth_info` VALUES ('138', '权限管理', '删除', '/role/delRole.action');
INSERT INTO `auth_info` VALUES ('140', '人员管理', '查询', '/user/findByCondition.action');
INSERT INTO `auth_info` VALUES ('141', '人员管理', '查询', '/user/findById.action');
INSERT INTO `auth_info` VALUES ('142', '人员管理', '添加', '/user/addUser.action');
INSERT INTO `auth_info` VALUES ('143', '人员管理', '修改', '/user/updateUser.action');
INSERT INTO `auth_info` VALUES ('144', '人员管理', '删除', '/user/delUser.action');
INSERT INTO `auth_info` VALUES ('145', '人员管理', '查询', '/role/isExitRoleByCreator.action');
INSERT INTO `auth_info` VALUES ('146', '人员管理', '查询', '/user/resetPassword.action');
INSERT INTO `auth_info` VALUES ('147', '人员管理', '查询', '/role/queryRoleInfo.action');
INSERT INTO `auth_info` VALUES ('148', '人员管理', '查询', '/org/queryOrgInfoByParentId.action');
INSERT INTO `auth_info` VALUES ('150', '贷款申请与查询', '贷款申请提交', '/loan/addLoan.action');
INSERT INTO `auth_info` VALUES ('151', '贷款申请与查询', '查询流水信息', '/loanJournal/findByCondition.action');
INSERT INTO `auth_info` VALUES ('152', '贷款申请与查询', '查询单个申请信息', '/loan/findById.action');
INSERT INTO `auth_info` VALUES ('160', '贷款进件处理', '查询流水信息', '/loanJournal/findByCondition.action');
INSERT INTO `auth_info` VALUES ('161', '贷款进件处理', '查询人员', '/user/findByCondition.action');
INSERT INTO `auth_info` VALUES ('162', '贷款进件处理', '查询审核人员下拉列表', '/user/queryReviewUserOptions.action');
INSERT INTO `auth_info` VALUES ('163', '贷款进件处理', '分配审核申请', '/loanJournal/updateLoanJournalDistribution.action');
INSERT INTO `auth_info` VALUES ('170', '贷款审查处理', '查询流水信息', '/loanJournal/findByCondition.action');
INSERT INTO `auth_info` VALUES ('171', '贷款审查处理', '查询贷款信息', '/loan/findById.action');
INSERT INTO `auth_info` VALUES ('172', '贷款审查处理', '拒绝', '/loanJournal/updateLoanJournalRefuse.action');
INSERT INTO `auth_info` VALUES ('173', '贷款审查处理', '补件', '/loanJournal/updateLoanJournalResubmit.action');
INSERT INTO `auth_info` VALUES ('174', '贷款审查处理', '提交审查', '/loanJournal/updateLoanJournalReview.action');
INSERT INTO `auth_info` VALUES ('180', '贷款申请管理', '查询申请流水信息', '/loanJournal/findByCondition.action');
INSERT INTO `auth_info` VALUES ('181', '贷款申请管理', '查询申请信息', '/loan/findById.action');
INSERT INTO `auth_info` VALUES ('182', '贷款申请管理', '不同意', '/loanJournal/updateLoanJournalRefuse.action');
INSERT INTO `auth_info` VALUES ('183', '贷款申请管理', '再议', '/loanJournal/updateLoanJournalResubmit.action');
INSERT INTO `auth_info` VALUES ('184', '贷款申请管理', '同意', '/loanJournal/updateLoanJournal2Review.action');
/* 初始化menu_auth */
INSERT INTO `menu_auth` VALUES ('1', '3', '100');
INSERT INTO `menu_auth` VALUES ('2', '3', '101');
INSERT INTO `menu_auth` VALUES ('3', '3', '102');
INSERT INTO `menu_auth` VALUES ('4', '3', '103');

INSERT INTO `menu_auth` VALUES ('5', '4', '110');
INSERT INTO `menu_auth` VALUES ('6', '4', '111');
INSERT INTO `menu_auth` VALUES ('7', '4', '112');
INSERT INTO `menu_auth` VALUES ('8', '4', '113');
INSERT INTO `menu_auth` VALUES ('9', '4', '114');
INSERT INTO `menu_auth` VALUES ('10', '4', '115');

INSERT INTO `menu_auth` VALUES ('11', '6', '120');
INSERT INTO `menu_auth` VALUES ('12', '6', '121');
INSERT INTO `menu_auth` VALUES ('13', '6', '122');
INSERT INTO `menu_auth` VALUES ('14', '6', '123');
INSERT INTO `menu_auth` VALUES ('15', '6', '124');
INSERT INTO `menu_auth` VALUES ('16', '6', '125');
INSERT INTO `menu_auth` VALUES ('17', '6', '126');

INSERT INTO `menu_auth` VALUES ('18', '7', '130');
INSERT INTO `menu_auth` VALUES ('19', '7', '131');
INSERT INTO `menu_auth` VALUES ('20', '7', '132');
INSERT INTO `menu_auth` VALUES ('21', '7', '133');
INSERT INTO `menu_auth` VALUES ('22', '7', '134');
INSERT INTO `menu_auth` VALUES ('23', '7', '135');
INSERT INTO `menu_auth` VALUES ('24', '7', '136');
INSERT INTO `menu_auth` VALUES ('25', '7', '137');
INSERT INTO `menu_auth` VALUES ('26', '7', '138');
INSERT INTO `menu_auth` VALUES ('27', '8', '140');
INSERT INTO `menu_auth` VALUES ('28', '8', '141');
INSERT INTO `menu_auth` VALUES ('29', '8', '142');
INSERT INTO `menu_auth` VALUES ('30', '8', '143');
INSERT INTO `menu_auth` VALUES ('31', '8', '144');
INSERT INTO `menu_auth` VALUES ('32', '8', '145');
INSERT INTO `menu_auth` VALUES ('33', '8', '146');
INSERT INTO `menu_auth` VALUES ('34', '8', '147');
INSERT INTO `menu_auth` VALUES ('35', '8', '148');
INSERT INTO `menu_auth` VALUES ('36', '10', '150');
INSERT INTO `menu_auth` VALUES ('37', '10', '151');
INSERT INTO `menu_auth` VALUES ('38', '10', '152');
INSERT INTO `menu_auth` VALUES ('39', '11', '160');
INSERT INTO `menu_auth` VALUES ('40', '11', '161');
INSERT INTO `menu_auth` VALUES ('41', '11', '162');
INSERT INTO `menu_auth` VALUES ('42', '11', '163');
INSERT INTO `menu_auth` VALUES ('43', '12', '170');
INSERT INTO `menu_auth` VALUES ('44', '12', '171');
INSERT INTO `menu_auth` VALUES ('45', '12', '172');
INSERT INTO `menu_auth` VALUES ('46', '12', '173');
INSERT INTO `menu_auth` VALUES ('47', '12', '174');
INSERT INTO `menu_auth` VALUES ('48', '13', '180');
INSERT INTO `menu_auth` VALUES ('49', '13', '181');
INSERT INTO `menu_auth` VALUES ('50', '13', '182');
INSERT INTO `menu_auth` VALUES ('51', '13', '183');
INSERT INTO `menu_auth` VALUES ('52', '13', '184');


/* 初始化role_info */
INSERT INTO `role_info` VALUES (1, '开发者', '菜单管理参数管理', NULL);
INSERT INTO `role_info` VALUES (999, '权限管理员', '用户权限管理', NULL);

/* 初始化role_auth */
INSERT INTO `role_auth` VALUES ('1', '1', '100');
INSERT INTO `role_auth` VALUES ('2', '1', '101');
INSERT INTO `role_auth` VALUES ('3', '1', '102');
INSERT INTO `role_auth` VALUES ('4', '1', '103');
INSERT INTO `role_auth` VALUES ('5', '1', '110');
INSERT INTO `role_auth` VALUES ('6', '1', '111');
INSERT INTO `role_auth` VALUES ('7', '1', '112');
INSERT INTO `role_auth` VALUES ('8', '1', '113');
INSERT INTO `role_auth` VALUES ('9', '1', '114');
INSERT INTO `role_auth` VALUES ('10', '1', '115');
INSERT INTO `role_auth` VALUES ('11', '999', '120');
INSERT INTO `role_auth` VALUES ('12', '999', '121');
INSERT INTO `role_auth` VALUES ('13', '999', '122');
INSERT INTO `role_auth` VALUES ('14', '999', '123');
INSERT INTO `role_auth` VALUES ('15', '999', '124');
INSERT INTO `role_auth` VALUES ('16', '999', '125');
INSERT INTO `role_auth` VALUES ('17', '999', '126');
INSERT INTO `role_auth` VALUES ('18', '999', '130');
INSERT INTO `role_auth` VALUES ('19', '999', '131');
INSERT INTO `role_auth` VALUES ('20', '999', '132');
INSERT INTO `role_auth` VALUES ('21', '999', '133');
INSERT INTO `role_auth` VALUES ('22', '999', '134');
INSERT INTO `role_auth` VALUES ('23', '999', '135');
INSERT INTO `role_auth` VALUES ('24', '999', '136');
INSERT INTO `role_auth` VALUES ('25', '999', '137');
INSERT INTO `role_auth` VALUES ('26', '999', '138');
INSERT INTO `role_auth` VALUES ('27', '999', '140');
INSERT INTO `role_auth` VALUES ('28', '999', '141');
INSERT INTO `role_auth` VALUES ('29', '999', '142');
INSERT INTO `role_auth` VALUES ('30', '999', '143');
INSERT INTO `role_auth` VALUES ('31', '999', '144');
INSERT INTO `role_auth` VALUES ('32', '999', '145');
INSERT INTO `role_auth` VALUES ('33', '999', '146');
INSERT INTO `role_auth` VALUES ('34', '999', '147');
INSERT INTO `role_auth` VALUES ('35', '999', '148');

/* 初始化role_menu */
INSERT INTO `role_menu` VALUES (1, 1, 3);
INSERT INTO `role_menu` VALUES (2, 1, 2);
INSERT INTO `role_menu` VALUES (3, 1, 4);
INSERT INTO `role_menu` VALUES (4, 999, 5);
INSERT INTO `role_menu` VALUES (5, 999, 6);
INSERT INTO `role_menu` VALUES (6, 999, 7);
INSERT INTO `role_menu` VALUES (7, 999, 8);

/* 初始化user_info */
INSERT INTO `user_info` VALUES ('admin', '管理员', '72axtmmITGvJO0kkRZmlVg==', NULL, NULL, NULL, NULL, NULL,1,'00001',NULL);
INSERT INTO `user_info` VALUES ('developer', '开发者', 'RmHwWuxImWE1UQwwECFNkQ==', NULL, NULL, NULL, NULL, NULL,1,'00001',NULL);

/* 初始化user_role */
INSERT INTO `user_role` VALUES (1, 1, 'developer');
INSERT INTO `user_role` VALUES (2, 999, 'admin');


/* 初始化bms_param */
INSERT INTO `bms_param` VALUES ('fileSavePath', 'D:\\fileSavePath', '文件保存路径');
INSERT INTO `bms_param` VALUES ('productImageCountLimit', '10', '产品图片限制数量');
INSERT INTO `bms_param` VALUES ('productVideoCountLimit', '2', '产品视频限制数量');

INSERT INTO ORG_INFO (org_id, parent_id, org_code, org_name, org_addr, org_manager, org_telephone, org_path, editor, approver, approval_time, last_edit_time, edit_flag)
VALUES (1, NULL, '000000000', '总部', '', '', '', '00001', '', '', '', '', '0');
commit;