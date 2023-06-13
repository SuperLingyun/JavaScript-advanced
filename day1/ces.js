//是否勾选劳务报销
var labourServices = getLabourServices();

//单据编号
var lwidsql = "/*dialect*/SELECT count(1) count FROM T_BC_BizAccountBill where  fid='" + Id + "' and FBizReqDate >= trunc(sysdate, 'MM')and FBizReqDate < add_months(trunc(sysdate, 'MM'), 1)";

function lwdata() {

    if (labourServices) {
        //执行SQL并将值赋予变量
        var rs = com.kingdee.eas.util.UIHelper.exec(lwidsql);

        while (rs.next()) {
            var count = rs.getString("count");

            if (count == 0 || count == null) {
                //弹窗提示
                com.kingdee.eas.util.client.MsgBox.showInfo("请到OA申请当月劳务审批单流程，审批通过再报销。");
                //阻止继续提交
                com.kingdee.eas.util.SysUtil.abort();
            }
            if (count > 1) {
                com.kingdee.eas.util.client.MsgBox.showInfo("当月有" + count + "张未报销劳务审批单，请联系IT删除。");
                com.kingdee.eas.util.SysUtil.abort();
            }


        }
    }
}
lwdata();

//判断是否勾选
function getLabourServices() {
    if (pluginCtx.getKDCheckBox("chkislaowu").getSelectState() == 32) {
        return true
    }
    else return false
}

//申请人
var applier = pluginCtx.getKDBizPromptBox("bizPromptApplier").getValue().toString();
var lwsql = "/*dialect*/select  count(1) count from CT_WFB_HT_WJ_LWSPD LEFT JOIN T_BD_Person tbp ON FProposerID = tbp.FID where tbp.FNAME_L2='" + applier + "'  and to_char(FrequestDate,'yyyyMM')=to_char(sysdate,'yyyyMM') and (ftitle is null or  ftitle='') and FWorkflowStatus=2";


function laborReimbursement() {

    //获取符合条件的数量

    if (labourServices) {
        //执行SQL并将值赋予变量
        var rs = com.kingdee.eas.util.UIHelper.exec(lwsql);

        while (rs.next()) {
            var count = rs.getString("count");

            if (count == 0 || count == null) {
                //弹窗提示
                com.kingdee.eas.util.client.MsgBox.showInfo("请到OA申请当月劳务审批单流程，审批通过再报销。");
                //阻止继续提交
                com.kingdee.eas.util.SysUtil.abort();
            }
            if (count > 1) {
                com.kingdee.eas.util.client.MsgBox.showInfo("当月有" + count + "张未报销劳务审批单，请联系IT删除。");
                com.kingdee.eas.util.SysUtil.abort();
            }

        }
    }
}
laborReimbursement();


//加载
//劳务报销
pluginCtx.getKDCheckBox("chkislaowu").setVisible(false);

//反审核
function getLabourServices() {
    if (pluginCtx.getKDCheckBox("chkislaowu").getSelectState() == 32) {
        return true
    }
    return false
}
var lw = getLabourServices();


if (lw) {
    //申请人
    var applier = pluginCtx.getKDBizPromptBox("bizPromptApplier").getValue().toString();
    var sql = "update CT_WFB_HT_WJ_LWSPD set ftitle = null where fid =(select   lw.fid from CT_WFB_HT_WJ_LWSPD lw LEFT JOIN T_BD_Person tbp ON lw.FProposerID = tbp.FID where tbp.FNAME_L2='" + applier + "'  and FBizReqDate >= trunc(sysdate, 'MM')and FBizReqDate < add_months(trunc(sysdate, 'MM'), 1) and lw.FWorkflowStatus=2)";
    com.kingdee.eas.util.UIHelper.exeInsSQL(sql);
    ///*dialect*/
};



proposerid = ""; Pos2personid = ""; approveResult = ""; java.sql.Connection con1 = com.kingdee.bos.framework.ejb.EJBFactory.getConnection(__bosContext); java.sql.Statement st1 = con1.createStatement(); java.sql.ResultSet rs1 = null; String sql1 = "update T_BC_EvectionReqBill set  fstate='25'  where fid='" + EvectionReqBill.id + "'"; System.out.println(sql1.toString()); rs1 = st1.executeQuery(sql1); com.kingdee.util.db.SQLUtils.cleanup(st1, con1); com.kingdee.util.db.SQLUtils.cleanup(con1);