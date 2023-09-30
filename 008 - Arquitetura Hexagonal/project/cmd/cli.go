/*
Copyright © 2023 NAME HERE <EMAIL ADDRESS>

*/
package cmd

import (
	"fmt"
	"github.com/spf13/cobra"
	"go-hexagonal/adapters/cli"
)

var (
	action string
	productId string
	productName  string
	productPrice float64
)

// cliCmd represents the cli command
var cliCmd = &cobra.Command{
	Use:   "cli",
	Short: "Kelps Product CLI",
	Long: `CLI usada como adaptar para aplicar Arquitetura Hexagonal.`,
	Run: func(cmd *cobra.Command, args []string) {
		res, err := cli.Run(productService, action, productId, productName, productPrice)

		if err != nil {
			fmt.Println(err.Error())
		}

		fmt.Println(res)
	},
}

func init() {
	rootCmd.AddCommand(cliCmd)
	cliCmd.Flags().StringVarP(&action, "action", "a", "enable", "Enable / Disable a product")
	cliCmd.Flags().StringVarP(&productId, "id", "i", "", "Product ID")
	cliCmd.Flags().StringVarP(&productName, "name", "n", "", "Product Name")
	cliCmd.Flags().Float64VarP(&productPrice, "price", "p", 0, "Product Price")

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// cliCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// cliCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
