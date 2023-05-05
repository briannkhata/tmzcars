SELECT
    sad.ide_cuo_cod office,
    sad.tpt_cuo_cod entry,
    sad.dec_cod dec_code,
    dec.dec_nam "AGENT  NAME",
    sad.cmp_fis_cod beneficiary_tpin,
    TO_CHAR(sad.cmp_fis_nam) beneficiary,
    sad.ide_reg_dat regdate,
    sad.ide_reg_ser || sad.ide_reg_nbr regno,
    sad.cmp_con_cod tpin,
    TO_CHAR(sad.cmp_con_nam) "IMPORTER NAME",
    sad.dec_ref_yer year,
    item.key_itm_nbr itemno,
    CASE WHEN sad.pty_blu = 1 THEN 'BLUE' WHEN sad.pty_red = 1 THEN 'RED' WHEN sad.pty_yel = 1 THEN 'YELLOW' ELSE 'GREEN' END "Lane At Selectivity",
    sad.pty_col_dsc "Current Lane",
    sad.ide_typ_sad || sad.ide_typ_prc regime,
    item.tar_hsc_nb1 hscode,
    tar.tar_dsc "TARIFF DESCRIPTION",
    item.gds_ds3 "COMMERCIAL DESCRIPTION",
    item.tar_prc_ext "EXTENDED PROC",
    item.tar_prc_nat cpc,
    item.tar_prf preference,
    sap.tar_sup_qty qty,
    item.pck_typ_nam pkgknd,
    item.pck_nbr packages,
    cty.cty_dsc origin,
    dbms_lob.substr(sad.cmp_con_nam, 80) "CONSIGNEE NAME",
    sad.cmp_exp_nam EXPORTER,
    sad.gen_cty_ept_nam lastconsigned,
    item.vit_wgt_grs grossweight,
    item.vit_wgt_net netweight,
    sad.tpt_tod_cod DELIVERY,
    item.vit_ins_amt_fcx insurance,
    item.vit_efr_amt_nmu freight,
    item.vit_otc_amt_nmu other_costs,
    item.vit_inv_amt_fcx "FOB FCY",
    item.vit_inv_cur_cod currency,
    item.vit_inv_cur_rat excrate,
    item.vit_cif "VDP AMOUNTS",
    tax.tax_lin_amt duty,
    tax2.tax_lin_amt excise,
    tax3.tax_lin_amt vat,
    NVL(tax4.tax_lin_amt, 0) SCH,
    NVL(tax5.tax_lin_amt, 0) AIT,
    tax.tax_lin_amt + tax2.tax_lin_amt + tax3.tax_lin_amt + NVL(tax4.tax_lin_amt, 0) + NVL(tax5.tax_lin_amt, 0) totaltax,
    loss1.duty_loss,
    loss2.excise_loss,
    loss3.vat_loss,
    topup1.amt "Topup Amount",
    topup1.offences list_offences,
    sad.fin_mpn payment_terms,
    /**  rtrim(nvl(whs.whs_adr, '')   
                  || ','   
                  || nvl(whs.whs_ad2, '')   
                  || ','   
                  || nvl(whs.whs_ad3, '')   
                  || ','   
                  || nvl(whs.whs_ad4, '')   
                  || ','   
                  || nvl(whs.whs_tel, '')   
                  || ','   
                  || nvl(whs.whs_fax, ''), ',') "ADDRESS",   
                  sad.tpt_mot_brd_cod Means_of_tpt,   
                  sad.rls_tim Release_Date*/
    sad.tpt_mot_brd_cod Means_of_tpt
FROM
    awunadm.sad_general_segment sad
    JOIN awunadm.sad_item item ON sad.instanceid = item.instanceid
    JOIN awunadm.untartab tar ON item.tar_hsc_nb1 = tar.hs6_cod || tar.tar_pr1
    JOIN awunadm.unctytab cty ON cty.cty_cod = item.gds_org_cty
    AND cty.valid_to IS NULL
    LEFT JOIN awunadm.sad_tax tax ON item.instanceid = tax.instanceid
    AND item.key_itm_nbr = tax.key_itm_nbr
    AND tax.tax_lin_cod = 'ICD'
    LEFT JOIN awunadm.sad_tax tax2 ON item.instanceid = tax2.instanceid
    AND item.key_itm_nbr = tax2.key_itm_nbr
    AND tax2.tax_lin_cod = 'EXC'
    LEFT JOIN awunadm.sad_tax tax3 ON item.instanceid = tax3.instanceid
    AND item.key_itm_nbr = tax3.key_itm_nbr
    AND tax3.tax_lin_cod = 'VAT'
    LEFT JOIN awunadm.sad_tax tax4 ON item.instanceid = tax4.instanceid
    AND item.key_itm_nbr = tax3.key_itm_nbr
    AND tax4.tax_lin_cod = 'SCH'
    LEFT JOIN awunadm.sad_tax tax5 ON item.instanceid = tax5.instanceid
    AND item.key_itm_nbr = tax5.key_itm_nbr
    AND tax5.tax_lin_cod = 'AIT'
    JOIN awunadm.undectab dec ON dec.dec_cod = sad.dec_cod
    AND dec.valid_to IS NULL
    JOIN awunadm.unctytab cty ON cty.cty_cod = sad.gen_cty_des_cod
    LEFT JOIN awunadm.sad_supplementary_unit sap ON item.instanceid = sap.instanceid
    AND item.key_itm_nbr = sap.key_itm_nbr
    JOIN awunadm.un_asybrk_ied ied ON (
        sad.instanceid = ied.instance_id
        AND ied.binder_id = 'B_asysad'
    )
    JOIN (
        SELECT
            x.doc_ver,
            x.ied_id,
            y.status
        FROM
            (
                SELECT
                    MAX(doc_ver) doc_ver,
                    ied_id
                FROM
                    awunadm.un_asybrk_track
                GROUP BY
                    ied_id
                ORDER BY
                    2
            ) x
            JOIN (
                SELECT
                    ied_id,
                    doc_ver,
                    status
                FROM
                    awunadm.un_asybrk_track
                WHERE
                    status NOT IN (
                        'Assessed',
                        'Cancelled'
                    )
                ORDER BY
                    1
            ) y ON y.ied_id = x.ied_id
            AND x.doc_ver = y.doc_ver
    ) ki ON ki.ied_id = ied.ied_id
    LEFT JOIN (
        SELECT
            DISTINCT awunadm.insp_act_tab.ide_cuo_cod,
            awunadm.insp_act_tab.sad_reg_nbr,
            awunadm.insp_act_tab.sad_reg_ser,
            awunadm.insp_act_tab.sad_dec_ref_yea,
            LISTAGG(awunadm.insp_act_exam.frd_cod, ' ,  ') WITHIN GROUP(
                ORDER BY
                    awunadm.insp_act_tab.ide_cuo_cod,
                    awunadm.insp_act_tab.sad_reg_ser
            ) offences,
            CASE WHEN SUM(awunadm.insp_act_exam.amt) > 0 THEN SUM(awunadm.insp_act_exam.amt) ELSE 0 END AS amt
        FROM
            awunadm.insp_act_exam
            INNER JOIN awunadm.insp_act_tab ON awunadm.insp_act_tab.instance_id = awunadm.insp_act_exam.instance_id
        GROUP BY
            awunadm.insp_act_tab.ide_cuo_cod,
            awunadm.insp_act_tab.sad_reg_nbr,
            awunadm.insp_act_tab.sad_reg_ser,
            awunadm.insp_act_tab.sad_dec_ref_yea
    ) topup1 ON topup1.ide_cuo_cod = sad.ide_cuo_cod
    AND topup1.sad_reg_ser = sad.ide_reg_ser
    AND topup1.sad_reg_nbr = sad.ide_reg_nbr
    AND topup1.sad_dec_ref_yea = sad.dec_ref_yer
    LEFT JOIN (
        SELECT
            item.instanceid instanceid,
            sad.ide_reg_ser || sad.ide_reg_nbr regno,
            item.key_itm_nbr itemno,
            SUM(nvl(relief.tax_amount, 0)) duty_loss
        FROM
            awunadm.sad_general_segment sad
            JOIN awunadm.sad_item item ON sad.instanceid = item.instanceid
            JOIN awunadm.sad_relief relief ON item.instanceid = relief.instanceid
            AND item.key_itm_nbr = relief.key_itm_nbr
            AND relief.tax_code = 'ICD'
        GROUP BY
            item.instanceid,
            item.key_itm_nbr,
            sad.ide_reg_ser,
            sad.ide_reg_nbr
    ) loss1 ON item.instanceid = loss1.instanceid
    AND loss1.itemno = item.key_itm_nbr
    LEFT JOIN (
        SELECT
            item.instanceid instanceid,
            sad.ide_reg_ser || sad.ide_reg_nbr regno,
            item.key_itm_nbr itemno,
            SUM(nvl(relief.tax_amount, 0)) excise_loss
        FROM
            awunadm.sad_general_segment sad
            JOIN awunadm.sad_item item ON sad.instanceid = item.instanceid
            JOIN awunadm.sad_relief relief ON item.instanceid = relief.instanceid
            AND item.key_itm_nbr = relief.key_itm_nbr
            AND relief.tax_code = 'EXC'
        GROUP BY
            item.instanceid,
            item.key_itm_nbr,
            sad.ide_reg_ser,
            sad.ide_reg_nbr
    ) loss2 ON item.instanceid = loss2.instanceid
    AND loss2.itemno = item.key_itm_nbr
    LEFT JOIN (
        SELECT
            item.instanceid instanceid,
            sad.ide_reg_ser || sad.ide_reg_nbr regno,
            item.key_itm_nbr itemno,
            SUM(nvl(relief.tax_amount, 0)) vat_loss
        FROM
            awunadm.sad_general_segment sad
            JOIN awunadm.sad_item item ON sad.instanceid = item.instanceid
            JOIN awunadm.sad_relief relief ON item.instanceid = relief.instanceid
            AND item.key_itm_nbr = relief.key_itm_nbr
            AND relief.tax_code = 'VAT'
        GROUP BY
            item.instanceid,
            item.key_itm_nbr,
            sad.ide_reg_ser,
            sad.ide_reg_nbr
    ) loss3 ON item.instanceid = loss3.instanceid
    AND loss3.itemno = item.key_itm_nbr
WHERE
    - - sad.ide_rcp_dat BETWEEN '01-JAN-23'
    AND '31-JAN-23' sad.cmp_con_cod IN ('20140240')
    and dec.valid_to IS NULL
    AND tar.valid_to IS NULL
    AND sad.ide_typ_prc IN (4, 5, 6, 7, 8)
ORDER BY
    1,
    3,
    5,
    6,
    7,
    9,
    10;