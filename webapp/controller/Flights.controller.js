sap.ui.define([
    "sap/ui/core/mvc/Controller",
     "sap/m/MessageToast"
],
function (Controller,MessageToast) {
    "use strict";

    return Controller.extend("student.com.sap.training.advancedsapui5.fullscreen.controller.Flights", {
        
        
        getRouter: function () {
            return sap.ui.core.UIComponent.getRouterFor(this);
        },


        _onBindingChange: function () {
            var oElementBinding;

            oElementBinding = this.getView().getElementBinding();

            // No data for the binding 
            if (oElementBinding && !oElementBinding.getBoundContext()) {
                this.getRouter().getTargets().display("notFound");
            }
        },
        
        
        _onObjectMatched: function (oEvent) {
            var oArgs = oEvent.getParameter("arguments");
            this._sCarrierId = oArgs.carrid;
            var oView = this.getView();
            oView.bindElement({
                path: "/UX_C_Carrier_TP('" + this._sCarrierId + "')",
                events: {
                    change: this._onBindingChange.bind(this),
                    dataRequested: function () {
                        oView.setBusy(true);
                    },
                    dataReceived: function () {
                        oView.setBusy(false);
                    }
                }
            });
        },
        
        

        onInit: function () {
            var oRouter = this.getRouter();
            oRouter.getRoute("flights").attachMatched(this._onObjectMatched, this);
        },

        
        onNavBack: function () {
            var oHistory, sPreviousHash;
        
            oHistory = sap.ui.core.routing.History.getInstance();
            sPreviousHash = oHistory.getPreviousHash();
        
            if (sPreviousHash !== undefined) {
            window.history.go(-1);
            } else {
            this.getRouter().navTo("overview", true /*no history*/);
            }
        },

        
        onHover: function(evt) {
            
            var sText = this.getOwnerComponent().getModel("i18n").getProperty("msgSeatsAv");
            MessageToast.show(evt.getSource().getHoverText() + " " + sText, {duration: 1000}); 
        }
    });
});
